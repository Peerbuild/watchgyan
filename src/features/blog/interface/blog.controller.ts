'use server';

import { safeAction } from '@/lib/safeAction';
import { BlogService } from './blog.service';
import { CreateBlogRequest, createBlogRequestDto } from '../dto/createBlog.dto';
import { getBlogByIdRequestDto } from '../dto/getBlogById.dto';
import { revalidatePath } from 'next/cache';

const blogService = new BlogService();

export const createBlog = safeAction(async (data: CreateBlogRequest) => {
  const newBlog = blogService.createBlog(data);
  revalidatePath('/blog');
  revalidatePath('/');
  return newBlog;
}, createBlogRequestDto);

export const getRecentBlogs = safeAction(async () => {
  return blogService.getRecentBlogs();
});

export const getBlogById = safeAction(async (id: string) => {
  return blogService.getBlogById(id);
}, getBlogByIdRequestDto);

export const getTopBlogs = safeAction(async () => {
  return blogService.getTopBlogs();
});
