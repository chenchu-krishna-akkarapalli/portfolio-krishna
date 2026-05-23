import blogsData from "@/data/blogs.json";
import BlogCards from "@/components/blog/BlogCards";

type BlogsData = typeof blogsData;

export default function BlogContent() {
  const data: BlogsData = blogsData;

  return (
    <div className="mx-auto flex w-full max-w-[580px] flex-col pb-[50px] pt-[35px]">
      <section className="flex w-full flex-col gap-[16px]">
        <p className="min-w-full text-[24px] font-bold leading-[normal] text-white">{data.title}</p>
        <p className="w-full max-w-[576px] whitespace-pre-line text-[14px] font-medium leading-[normal] text-text-secondary">
          {data.description}
        </p>
      </section>

      <section className="mt-[32px]">
        <BlogCards items={data.posts} />
      </section>
    </div>
  );
}
