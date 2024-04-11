-- CreateTable
CREATE TABLE "licenses" (
    "id" TEXT NOT NULL,
    "url" TEXT,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "spdxId" TEXT NOT NULL,

    CONSTRAINT "licenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "milestones_url" TEXT NOT NULL,
    "assignees_url" TEXT NOT NULL,
    "subscribers_url" TEXT NOT NULL,
    "issue_events_url" TEXT NOT NULL,
    "teams_url" TEXT NOT NULL,
    "issues_url" TEXT NOT NULL,
    "has_projects" BOOLEAN NOT NULL,
    "contents_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "has_downloads" BOOLEAN NOT NULL,
    "is_disabled" BOOLEAN NOT NULL,
    "watchers_count" INTEGER NOT NULL,
    "node_id" TEXT NOT NULL,
    "description" TEXT,
    "merges_url" TEXT NOT NULL,
    "homepage" TEXT,
    "forks_count" INTEGER NOT NULL,
    "permissions" JSON NOT NULL,
    "keys_url" TEXT NOT NULL,
    "forks_url" TEXT NOT NULL,
    "open_issues_count" INTEGER NOT NULL,
    "comments_url" TEXT NOT NULL,
    "language" TEXT,
    "has_pages" BOOLEAN NOT NULL,
    "trees_url" TEXT NOT NULL,
    "branches_url" TEXT NOT NULL,
    "is_archived" BOOLEAN NOT NULL,
    "subscription_url" TEXT NOT NULL,
    "labels_url" TEXT NOT NULL,
    "has_issues" BOOLEAN NOT NULL,
    "git_refs_url" TEXT NOT NULL,
    "issue_comment_url" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "languages_url" TEXT NOT NULL,
    "blobs_url" TEXT NOT NULL,
    "html_url" TEXT NOT NULL,
    "ssh_url" TEXT NOT NULL,
    "contributors_url" TEXT NOT NULL,
    "has_wiki" BOOLEAN NOT NULL,
    "releases_url" TEXT NOT NULL,
    "git_commits_url" TEXT NOT NULL,
    "defaultBranch" TEXT NOT NULL,
    "is_fork" BOOLEAN NOT NULL,
    "compare_url" TEXT NOT NULL,
    "mirror_url" TEXT,
    "commits_url" TEXT NOT NULL,
    "git_tags_url" TEXT NOT NULL,
    "archive_url" TEXT NOT NULL,
    "clone_url" TEXT NOT NULL,
    "svn_url" TEXT NOT NULL,
    "tags_url" TEXT NOT NULL,
    "events_url" TEXT NOT NULL,
    "statuses_url" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "stargazers_url" TEXT NOT NULL,
    "downloads_url" TEXT NOT NULL,
    "is_private" BOOLEAN NOT NULL,
    "stargazers_count" INTEGER NOT NULL,
    "deployments_url" TEXT NOT NULL,
    "git_url" TEXT NOT NULL,
    "collaborators_url" TEXT NOT NULL,
    "pushed_at" TIMESTAMP(3) NOT NULL,
    "hooks_url" TEXT NOT NULL,
    "pulls_url" TEXT NOT NULL,
    "allow_forking" BOOLEAN NOT NULL,
    "visibility" TEXT NOT NULL,
    "is_template" BOOLEAN NOT NULL,
    "topics" TEXT[],
    "owner_id" INTEGER NOT NULL,
    "license_id" TEXT,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "login" TEXT NOT NULL,
    "company" TEXT,
    "followingCount" INTEGER NOT NULL,
    "bio" TEXT,
    "nodeId" TEXT NOT NULL,
    "following_url" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "starred_url" TEXT NOT NULL,
    "followers_count" INTEGER NOT NULL,
    "site_admin" BOOLEAN NOT NULL,
    "location" TEXT,
    "twitter_handle" TEXT,
    "organizations_url" TEXT NOT NULL,
    "public_gists_count" INTEGER NOT NULL,
    "repos_url" TEXT NOT NULL,
    "received_events_url" TEXT NOT NULL,
    "html_url" TEXT NOT NULL,
    "public_repos_count" INTEGER NOT NULL,
    "subscriptions_url" TEXT NOT NULL,
    "blog_url" TEXT,
    "gravatar_id" TEXT,
    "gists_url" TEXT,
    "events_url" TEXT,
    "hireable" BOOLEAN NOT NULL,
    "followers_url" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "projects_fullName_key" ON "projects"("fullName");

-- CreateIndex
CREATE UNIQUE INDEX "projects_node_id_key" ON "projects"("node_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_login_key" ON "users"("login");

-- CreateIndex
CREATE UNIQUE INDEX "users_nodeId_key" ON "users"("nodeId");

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_license_id_fkey" FOREIGN KEY ("license_id") REFERENCES "licenses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
