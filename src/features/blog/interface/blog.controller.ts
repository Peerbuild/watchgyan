"use server";

import { safeAction } from "@/lib/safeAction";
import { CreateBlogRequest, createBlogRequestDto } from "../dto/createBlog.dto";
import { getBlogByIdRequestDto } from "../dto/getBlogById.dto";
import { revalidatePath } from "next/cache";
import {
  GetDraftBlogsRequest,
  getDraftBlogsRequestDto,
} from "../dto/getDraftBlog.dto";
import {
  PublishBlogRequest,
  publishBlogRequestDto,
} from "../dto/publishBlog.dto";
import { DeleteBlogRequest, deleteBlogRequestDto } from "../dto/deleteBlog.dto";
import { UpdateBlogRequest } from "../dto/updateBlog.dto";
import {
  GetRecentBlogRequest,
  getRecentBlogRequestDto,
} from "../dto/getRecentBlog.dto";
import {
  searchBlogRequestDto,
  SearchBlogRequestDto,
} from "../dto/searchBlog.dto";

const BlogService = (await import("./blog.service")).BlogService;
const blogService = new BlogService();

export const createBlog = await safeAction(async (data: CreateBlogRequest) => {
  const newBlog = await blogService.createBlog(data);
  revalidatePath("/blog");
  revalidatePath("/");
  return newBlog;
}, createBlogRequestDto);

export const publishBlog = await safeAction(
  async (data: PublishBlogRequest) => {
    const publishedBlog = await blogService.publishBlog(data);
    revalidatePath("/blog");
    revalidatePath("/");
    return publishedBlog;
  },
  publishBlogRequestDto,
);

export const getAllBlogs = await safeAction(
  async (data?: GetRecentBlogRequest) => {
    return blogService.getAllBlogs(data);
  },
  getRecentBlogRequestDto,
);

export const getRecentBlogs = await safeAction(
  async (data?: GetRecentBlogRequest) => {
    return blogService.getRecentBlogs(data);
  },
  getRecentBlogRequestDto,
  undefined,
  true,
);

export const getBlogById = await safeAction(
  async (id: string) => {
    return blogService.getBlogById(id);
  },
  getBlogByIdRequestDto,
  undefined,
  true,
);

export const getTopBlogs = await safeAction(
  async () => {
    return blogService.getTopBlogs();
  },
  undefined,
  undefined,
  true,
);

export const getDraftBlogs = await safeAction(
  async (data?: GetDraftBlogsRequest) => {
    return blogService.getDraftBlogs(data);
  },
  getDraftBlogsRequestDto,
);

export const updateBlog = await safeAction(async (data: UpdateBlogRequest) => {
  const updatedBlog = await blogService.updateBlog(data);
  revalidatePath(`/blog/${updatedBlog.id}/${updatedBlog.slug}`);
  revalidatePath("/blog");
  revalidatePath("/");
  return updatedBlog;
});

export const deleteBlog = await safeAction(async (data: DeleteBlogRequest) => {
  const blog = await blogService.deleteBlog(data);
  revalidatePath("/");
  return blog;
}, deleteBlogRequestDto);

export const searchBlogs = await safeAction(
  async (data: SearchBlogRequestDto) => {
    return blogService.searchBlogs(data);
  },
  searchBlogRequestDto,
);
