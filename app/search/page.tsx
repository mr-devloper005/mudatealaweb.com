'use client'

import { useState, useEffect, useMemo, useCallback, useTransition } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { PageShell } from "@/components/shared/page-shell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { buildPostUrl, getPostTaskKey } from "@/lib/task-data";
import { getMockPostsForTask } from "@/lib/mock-posts";
import { SITE_CONFIG } from "@/lib/site-config";
import { TaskPostCard } from "@/components/shared/task-post-card";
import type { SitePost } from "@/lib/site-connector";

const matchText = (value: string, query: string) =>
  value.toLowerCase().includes(query);

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, " ");

const compactText = (value: unknown) => {
  if (typeof value !== "string") return "";
  return stripHtml(value).replace(/\s+/g, " ").trim().toLowerCase();
};

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const initialQuery = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const taskFilter = searchParams.get('task') || '';
  const useMaster = searchParams.get('master') !== '0';

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [posts, setPosts] = useState<SitePost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const debouncedSearch = useDebounce(searchTerm, 300);

  // Fetch posts on mount
  useEffect(() => {
    async function fetchPosts() {
      setIsLoading(true);
      try {
        // Try to fetch from API first
        const res = await fetch(`/api/feed?limit=${useMaster ? 1000 : 300}${category ? `&category=${category}` : ''}${taskFilter ? `&task=${taskFilter}` : ''}`);
        if (res.ok) {
          const data = await res.json();
          setPosts(data.posts || []);
        } else {
          // Fallback to mock posts
          const mockPosts = SITE_CONFIG.tasks.flatMap((task) => getMockPostsForTask(task.key));
          setPosts(mockPosts);
        }
      } catch {
        // Fallback to mock posts on error
        const mockPosts = SITE_CONFIG.tasks.flatMap((task) => getMockPostsForTask(task.key));
        setPosts(mockPosts);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, [category, taskFilter, useMaster]);

  // Update URL when search changes (debounced)
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearch.trim()) {
      params.set('q', debouncedSearch.trim());
    } else {
      params.delete('q');
    }
    params.set('master', '1');
    startTransition(() => {
      router.replace(`/search?${params.toString()}`, { scroll: false });
    });
  }, [debouncedSearch, router, searchParams]);

  const normalizedQuery = debouncedSearch.toLowerCase().trim();

  const filteredPosts = useMemo(() => {
    if (!normalizedQuery) return posts.slice(0, 24);

    return posts.filter((post) => {
      const content = post.content && typeof post.content === 'object' ? post.content : {};
      const typeText = compactText((content as any).type);
      if (typeText === 'comment') return false;

      const description = compactText((content as any).description);
      const body = compactText((content as any).body);
      const excerpt = compactText((content as any).excerpt);
      const categoryText = compactText((content as any).category);
      const tags = Array.isArray(post.tags) ? post.tags.join(' ') : '';
      const tagsText = compactText(tags);
      const derivedCategory = categoryText || tagsText;

      if (category && !derivedCategory.includes(category.toLowerCase())) return false;
      if (taskFilter && typeText && typeText !== taskFilter.toLowerCase()) return false;

      return (
        matchText(compactText(post.title || ''), normalizedQuery) ||
        matchText(compactText(post.summary || ''), normalizedQuery) ||
        matchText(description, normalizedQuery) ||
        matchText(body, normalizedQuery) ||
        matchText(excerpt, normalizedQuery) ||
        matchText(tagsText, normalizedQuery)
      );
    });
  }, [posts, normalizedQuery, category, taskFilter]);

  const handleClear = useCallback(() => {
    setSearchTerm('');
  }, []);

  const displayQuery = searchTerm.trim();

  return (
    <PageShell
      variant="listing"
      title="Search"
      description={
        displayQuery
          ? `Results for "${displayQuery}" in the catalog`
          : "Search listings and posts across every task and category—same forest-and-mint layout as the home page."
      }
      actions={
        <div className="flex w-full gap-2 sm:w-auto">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#2d4a42]/70" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search listings, titles, tags…"
              className="h-11 border-[#c5e0d8] bg-white pl-9 pr-10 focus-visible:ring-[#66C2B2]"
            />
            {searchTerm && (
              <button
                onClick={handleClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2d4a42]/50 hover:text-[#2d4a42]"
              >
                <span className="sr-only">Clear</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <Button
            onClick={() => setSearchTerm(searchTerm)}
            className="h-11 bg-[#66C2B2] text-white hover:bg-[#52b39f]"
            disabled={isLoading || isPending}
          >
            {isLoading || isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Search'
            )}
          </Button>
        </div>
      }
    >
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-[#66C2B2]" />
        </div>
      ) : filteredPosts.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => {
            const task = getPostTaskKey(post);
            const href = task ? buildPostUrl(task, post.slug) : `/posts/${post.slug}`;
            return <TaskPostCard key={post.id} post={post} href={href} />;
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-[#b8dfd4] bg-white p-10 text-center shadow-[0_12px_36px_rgba(1,50,32,0.06)]">
          <p className="font-medium text-[#013220]">No matching listings or posts yet.</p>
          <p className="mt-2 text-sm text-[#2d4a42]">
            Try a shorter query, clear category filters, or browse from the home page to explore the full catalog.
          </p>
        </div>
      )}
    </PageShell>
  );
}
