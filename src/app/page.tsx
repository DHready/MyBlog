// pages/index.js
import fs from 'fs'
import path from 'path'
import { getSortedPostsData } from '@/lib/posts'
import ResourceList from '@/components/ResourceList'
import ArticleList from '@/components/ArticleList'
import { Metadata } from 'next'

// 首页组件: LemoBook 网站的主页面
// 展示网站概述、资源列表和最新文章列表
export const metadata: Metadata = {
  title: 'RuoXiao - A boy with a dream to make the world better',
  description: 'A Next.js site with Tailwind & Shadcn/UI, using GitHub API for content management. No database needed for dynamic updates.',
}

export default function Home() {
  // 构建资源文件路径并读取资源数据
  const resourcesPath = path.join(process.cwd(), 'data', 'json', 'resources.json')
  const allResources = JSON.parse(fs.readFileSync(resourcesPath, 'utf8'))
  
  // 限制首页只显示前10个资源
  const resources = allResources.slice(0, 10)
  
  // 获取所有文章数据
  const allPostsData = getSortedPostsData()

  return (
    // 页面主容器,使用 Tailwind 类设置布局和间距
    <div className="container mx-auto py-12 space-y-16">
      {/* 头部区域: 包含网站标题、副标题和简介 */}
      <section className="text-center space-y-4">
        {/* 主标题: 响应式字体大小设置 */}
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          RuoXiao
        </h1>
        {/* 副标题: 响应式字体大小设置 */}
        <h2 className="text-2xl tracking-tighter sm:text-3xl md:text-3xl lg:text-3xl">
          A boy with a dream to make the world better
        </h2>
        {/* 网站简介: 最大宽度限制和响应式文本大小 */}
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
          RuoXiao is Exploring The World.
        </p>
      </section>

      {/* 资源列表组件: 展示前10个资源，并添加"查看更多"链接 */}
      <ResourceList resources={resources} showMoreLink={true} />
      {/* 文章列表组件: 展示最新12篇文章，不启用分页 */}
      <ArticleList 
        articles={allPostsData} 
        showMoreLink={true} 
        enablePagination={false}
      />
    </div>
  )
}