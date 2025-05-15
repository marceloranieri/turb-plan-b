"use client";
import React from 'react';

interface PostScreenProps {
  postId: string;
}

export default function PostScreen({ postId }: PostScreenProps) {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Post</h1>
      <p>Content for post {postId} will appear here.</p>
    </div>
  );
} 