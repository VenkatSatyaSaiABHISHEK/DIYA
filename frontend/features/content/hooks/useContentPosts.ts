import { useState, useEffect, useMemo, useCallback } from 'react';
import { contentService } from '../services/content.service';
import { useContentStore } from '../store/content.store';
import type { ContentPost } from '../types';

export function useContentPosts() {
  const [posts, setPosts] = useState<ContentPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    filters,
    setFilter,
    resetFilters,
    selectedPostId,
    isDrawerOpen,
    openDrawer,
    closeDrawer,
    openRescheduleModal,
  } = useContentStore();

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await contentService.listPosts();
      setPosts(data);
    } catch {
      setError('Failed to fetch content posts. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Filtered & Sorted Posts
  const filteredPosts = useMemo(() => {
    if (filters.devState === 'empty') return [];

    let list = [...posts];

    // Search
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.caption.toLowerCase().includes(q) ||
          p.hashtags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    // Channel filter
    if (filters.channel !== 'all') {
      list = list.filter((p) => p.channel === filters.channel);
    }

    // Format filter
    if (filters.format !== 'all') {
      list = list.filter((p) => p.format === filters.format);
    }

    // Status filter
    if (filters.status !== 'all') {
      list = list.filter((p) => p.status === filters.status);
    }

    // Sort
    list.sort((a, b) => {
      if (filters.sortBy === 'score') {
        return b.predictedScore - a.predictedScore;
      }
      if (filters.sortBy === 'scheduled') {
        const timeA = a.scheduledFor ? new Date(a.scheduledFor).getTime() : 0;
        const timeB = b.scheduledFor ? new Date(b.scheduledFor).getTime() : 0;
        return timeB - timeA;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return list;
  }, [posts, filters]);

  // Statistics
  const summary = useMemo(() => {
    return {
      total: posts.length,
      scheduled: posts.filter((p) => p.status === 'scheduled').length,
      published: posts.filter((p) => p.status === 'published').length,
      needsApproval: posts.filter((p) => p.status === 'needs_approval').length,
      drafts: posts.filter((p) => p.status === 'draft').length,
    };
  }, [posts]);

  // Active Post for Drawer
  const activeDrawerPost = useMemo(() => {
    return posts.find((p) => p.id === selectedPostId) || null;
  }, [posts, selectedPostId]);

  // Actions
  const handleApprove = async (postId: string) => {
    try {
      const updated = await contentService.approvePost(postId);
      setPosts((prev) => prev.map((p) => (p.id === postId ? updated : p)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (postId: string) => {
    try {
      await contentService.deletePost(postId);
      setPosts((prev) => prev.filter((p) => p.id !== postId));
      if (selectedPostId === postId) closeDrawer();
    } catch (err) {
      console.error(err);
    }
  };

  const handleResetDemo = () => {
    contentService.resetDemoData();
    fetchPosts();
  };

  return {
    posts: filteredPosts,
    rawPosts: posts,
    isLoading: filters.devState === 'loading' ? true : isLoading,
    error: filters.devState === 'error' ? 'Dev State: Simulated Network Error' : error,
    summary,
    filters,
    setFilter,
    resetFilters,
    selectedPostId,
    activeDrawerPost,
    isDrawerOpen,
    openDrawer,
    closeDrawer,
    openRescheduleModal,
    handleApprove,
    handleDelete,
    handleResetDemo,
    refreshPosts: fetchPosts,
  };
}
