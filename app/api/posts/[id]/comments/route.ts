import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/core/supabase'
import { getCurrentUser } from '@/lib/features/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: postId } = await params

    const { data: comments, error } = await supabase
      .from('comments')
      .select(`
        *,
        user:users(*)
      `)
      .eq('post_id', postId)
      .order('created_at', { ascending: true })

    if (error) {
      throw error
    }

    return NextResponse.json({ comments: comments || [] })
  } catch (error: any) {
    console.error('Error fetching comments:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch comments' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id: postId } = await params
    const { content } = await request.json()

    if (!content || !content.trim()) {
      return NextResponse.json(
        { error: 'Comment content is required' },
        { status: 400 }
      )
    }

    // Create comment
    const { data: comment, error } = await supabase
      .from('comments')
      .insert({
        post_id: postId,
        user_id: user.id,
        content: content.trim(),
      })
      .select(`
        *,
        user:users(*)
      `)
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({ comment })
  } catch (error: any) {
    console.error('Error creating comment:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create comment' },
      { status: 500 }
    )
  }
}
