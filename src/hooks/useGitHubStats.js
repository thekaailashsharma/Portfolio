import { useState, useEffect } from 'react';

const CACHE_KEY = 'ks-github-stats';
const CACHE_DURATION = 1000 * 60 * 60;

export function useGitHubStats(username = 'thekaailashsharma') {
  const [stats, setStats] = useState(() => {
    try {
      const cached = JSON.parse(localStorage.getItem(CACHE_KEY));
      if (cached && Date.now() - cached.ts < CACHE_DURATION) return cached.data;
    } catch {}
    return { repos: 62, stars: 51, followers: 0, loading: true };
  });

  useEffect(() => {
    let cancelled = false;

    async function fetchStats() {
      try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (!res.ok) throw new Error('GitHub API error');
        const user = await res.json();

        const repoRes = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&sort=stars`
        );
        const repos = repoRes.ok ? await repoRes.json() : [];

        const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);

        const data = {
          repos: user.public_repos || 62,
          stars: totalStars || 51,
          followers: user.followers || 0,
          loading: false,
        };

        if (!cancelled) {
          setStats(data);
          localStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
        }
      } catch {
        if (!cancelled) setStats((prev) => ({ ...prev, loading: false }));
      }
    }

    fetchStats();
    return () => { cancelled = true; };
  }, [username]);

  return stats;
}
