"use client";

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowDown, Database, Plus, RefreshCcw, Search } from "lucide-react";
import { useUser } from "@/components/context/UserContext";
import { formatDistanceToNow } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { SidebarTrigger } from '@/components/ui/sidebar';
import Image from 'next/image';
import { AddRepoDialog } from '@/components/add-repo-dialog';

interface Repo {
  id: number;
  name: string;
  visibility: string;
  language: string;
  size: number;
  updated_at: string;
  html_url: string;
}

const fetchRepos = async (user: string) => {
  // delay for 1 second
  await new Promise(resolve => setTimeout(resolve, 1000));
  const res = await axios.get(`https://api.github.com/users/${user}/repos`);
  return res.data;
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const { user } = useUser();
  const { data: repos = [], isFetching, refetch } = useQuery<Repo[]>({
    queryKey: ["repos", user],
    queryFn: () => fetchRepos(user),
  });

  useEffect(() => {
    setSearchQuery("");
    setIsScrolledToBottom(false);
    refetch();
  }, [user, refetch]);

  const handleRefresh = () => {
    refetch();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    if (!isScrolledToBottom) {
      setIsScrolledToBottom(container.scrollTop + container.clientHeight >= container.scrollHeight);
    }
  };

  const handleChange = () => {
    const container = document.querySelector('.flex-col.divide-y');
    if (container) {
      if (!isScrolledToBottom) {
        container.scrollBy({
          top: container.scrollHeight / 2,
          behavior: 'smooth',
        });
      }
    }
  }

  const filteredRepos = repos.filter(repo =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const items = filteredRepos.map((repo) => ({
    title: repo.name,
    badge: repo.visibility,
    tag: repo.language,
    storage: repo.size,
    updated: repo.updated_at,
    url: repo.html_url,
  })).sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime());

  return (
    <div className="p-0 md:p-6 bg-[#FAFAFA]">
      <div className="prose max-w-none bg-white [&_*]:my-0 border w-full sm:rounded-lg flex flex-col">
        <div className="gap-2 px-3 py-1 flex md:hidden border-b justify-between">
          <Image src="/logo_w_text.svg" alt="CodeAnt AI" width={100} height={100} />
          <SidebarTrigger />
        </div>
        <div className="flex flex-col lg:flex-row p-3 md:p-6 gap-2 justify-between w-full border-b">
          <div className="space-y-2">
            <div>
              <h3>Repositories</h3>
              <p className="text-[#414651] text-xs sm:text-sm">{repos.length} total repositories</p>
            </div>
            <div className="relative w-full md:w-[300px]">
              <Search className="absolute left-2 top-1.5 sm:top-2.5 size-4 text-muted-foreground" />
              <Input
                placeholder="Search Repositories"
                className="pl-7 sm:pl-8 text-sm"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline"
              disabled={isFetching}
              size="sm"
              className="gap-2" onClick={handleRefresh}>
              <RefreshCcw />
              Refresh
            </Button>
            <AddRepoDialog>
              <Button
                size={"sm"}
                className="gap-2">
                <Plus />
                Add Repository
              </Button>
            </AddRepoDialog>
          </div>
        </div>
        <div className="flex flex-col divide-y h-[calc(100vh-185px)] sm:h-[calc(100vh-200px)] md:h-[calc(100vh-230px)] lg:h-[calc(100vh-190px)] overflow-auto" onScroll={handleScroll}>
          {isFetching ? Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="flex justify-between flex-col px-4 py-2 md:px-6 md:py-4 gap-4 hover:bg-[#F5F5F5]">
              <div className="flex gap-4">
                <Skeleton className='w-40 h-5' />
                <Skeleton className='w-16 h-5 rounded-xl' />
              </div>
              <div className="flex gap-8">
                <span className="flex flex-1 sm:flex-initial w-20 items-center gap-1">
                  <Skeleton className='w-full h-5' />
                  <div className="w-2 h-2 bg-[#1570EF] rounded-full inline-block ml-1"></div>
                </span>
                <span className="flex flex-1 sm:flex-initial w-20 gap-1 items-center">
                  <Database className="size-3" />
                  <Skeleton className='w-full h-5' />
                </span>
                <Skeleton className='flex-1 w-20 sm:flex-initial h-5' />
              </div>
            </div>
          ))
            : items?.map((item, index) => (
              <Tile key={index} {...item} />
            ))}
        </div>
        {
          !isScrolledToBottom ? (<div className="flex justify-center absolute self-center bottom-5 sm:bottom-10">
            <button
              onClick={handleChange}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              <ArrowDown />
            </button>
          </div>) : null
        }
      </div>
    </div>
  );
}

const Tile = ({ title, badge, tag, storage, updated, url }: {
  title: string;
  badge: string;
  tag: string;
  storage: number;
  updated: string;
  url: string;
}) => {

  const getStorage = (storage: number) => {
    if (storage >= 1024 * 1024) {
      return `${(storage / (1024 * 1024)).toFixed(1)} GB`;
    } else if (storage >= 1024) {
      return `${(storage / 1024).toFixed(1)} MB`;
    } else {
      return `${storage} KB`;
    }
  }

  return (
    <Link
      href={url}
      target='_blank'
      className="flex justify-between flex-col px-4 py-2 md:px-6 md:py-4 gap-2 hover:bg-[#F5F5F5] no-underline">
      <div className="flex gap-2">
        <h4 className='truncate'>{title}</h4>
        <span className="text-xs bg-[#EFF8FF] text-[#175CD3] border border-[#B2DDFF] px-1 sm:px-2 py-0.5 h-fit flex items-center justify-center rounded-full">{badge}</span>
      </div>
      <div className="flex gap-4 md:gap-8 text-xs sm:text-sm">
        <span className="flex items-center gap-1 max-w-[100px] sm:max-w-full">
          <span className='truncate '>{tag || "Unknown"}</span>
          <div className="w-2 h-2 bg-[#1570EF] rounded-full inline-block ml-1"></div>
        </span>
        <span className="flex gap-1 items-center">
          <Database className="size-3" />
          {getStorage(storage)}
        </span>
        <span className="text-gray-500">
          <span className='hidden md:inline-block'>Updated</span>
          {" "}
          {formatDistanceToNow(new Date(updated), {
            addSuffix: true,
          })}
        </span>
      </div>
    </Link>
  )
}