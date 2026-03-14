import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getCurrentUser } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id: followingId } = await params

    const { data: follow } = await supabase
      .from('follows')
      .select('id')
      .eq('follower_id', currentUser.id)
      .eq('following_id', followingId)
      .single()

    return NextResponse.json({
      isFollowing: !!follow,
    })
  } catch (error: any) {
    console.error('Error checking follow status:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to check follow status' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id: followingId } = await params

    // Check if already following
    const { data: existingFollow } = await supabase
      .from('follows')
      .select('id')
      .eq('follower_id', currentUser.id)
      .eq('following_id', followingId)
      .single()

    if (existingFollow) {
      return NextResponse.json({ success: true, following: true })
    }

    // Create follow
    const { error } = await supabase.from('follows').insert({
      follower_id: currentUser.id,
      following_id: followingId,
    })

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true, following: true })
  } catch (error: any) {
    console.error('Error following user:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to follow user' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id: followingId } = await params

    // Delete follow
    const { error } = await supabase
      .from('follows')
      .delete()
      .eq('follower_id', currentUser.id)
      .eq('following_id', followingId)

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true, following: false })
  } catch (error: any) {
    console.error('Error unfollowing user:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to unfollow user' },
      { status: 500 }
    )
  }
}
