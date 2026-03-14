import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Try to get user by ID first (UUID format)
    let query = supabase
      .from('users')
      .select('*')

    // Check if id looks like a wallet address (starts with 0x and long)
    if (id.startsWith('0x') && id.length > 20) {
      query = query.eq('wallet_address', id)
    } else {
      query = query.eq('id', id)
    }

    const { data: user, error } = await query.single()

    if (error || !user) {
      // Return a structure indicating user not found but provide the wallet address
      return NextResponse.json(
        { 
          error: 'User not found',
          walletAddress: id.startsWith('0x') ? id : null,
          user: null,
          followersCount: 0,
          followingCount: 0,
        },
        { status: 200 } // Return 200 instead of 404 so we can handle it in the UI
      )
    }

    // Get followers count
    const { count: followersCount } = await supabase
      .from('follows')
      .select('*', { count: 'exact', head: true })
      .eq('following_id', user.id)

    // Get following count
    const { count: followingCount } = await supabase
      .from('follows')
      .select('*', { count: 'exact', head: true })
      .eq('follower_id', user.id)

    return NextResponse.json({
      user,
      followersCount: followersCount || 0,
      followingCount: followingCount || 0,
    })
  } catch (error: any) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch user' },
      { status: 500 }
    )
  }
}

// Add PATCH endpoint to update user profile
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { display_name, bio, avatar_url } = body

    // Find user by wallet address or ID
    let query = supabase.from('users').select('*')
    
    if (id.startsWith('0x') && id.length > 20) {
      query = query.eq('wallet_address', id)
    } else {
      query = query.eq('id', id)
    }

    const { data: existingUser } = await query.single()

    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Update user
    const { data: updatedUser, error } = await supabase
      .from('users')
      .update({
        display_name,
        bio,
        avatar_url,
        updated_at: new Date().toISOString(),
      })
      .eq('id', existingUser.id)
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      user: updatedUser,
    })
  } catch (error: any) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update user' },
      { status: 500 }
    )
  }
}
