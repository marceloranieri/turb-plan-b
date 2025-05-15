"use client";
import React from 'react';

interface TopicScreenProps {
  topicId: string;
}

export default function TopicScreen({ topicId }: TopicScreenProps) {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Topic: {topicId}</h1>
      <p>Content for this topic will appear here.</p>
    </div>
  );
} 