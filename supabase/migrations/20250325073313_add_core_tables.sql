-- Create storage buckets
insert into storage.buckets (id, name)
values 
  ('books', 'books'),
  ('posts', 'posts'),
  ('resources', 'resources'),
  ('lost-founds', 'lost-founds'),
  ('avatars', 'avatars');

-- Enable RLS on storage buckets
alter table storage.objects enable row level security;

-- Create storage policies
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id in ('books', 'posts', 'resources', 'lost-founds', 'avatars') );

create policy "Authenticated users can upload files"
  on storage.objects for insert
  with check ( bucket_id in ('books', 'posts', 'resources', 'lost-founds', 'avatars') and auth.role() = 'authenticated' );

-- Books table
create table public.books (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text not null,
  price decimal(10,2) not null,
  image_url text not null,
  user_id uuid references auth.users not null,
  status text not null default 'available',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Study Groups table
create table public.study_groups (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text not null,
  course text not null,
  created_by uuid references auth.users not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Group Members table
create table public.group_members (
  id uuid default uuid_generate_v4() primary key,
  group_id uuid references public.study_groups not null,
  user_id uuid references auth.users not null,
  role text not null default 'member',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(group_id, user_id)
);

-- Lost and Found table
create table public.lost_found (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text not null,
  type text not null check (type in ('lost', 'found')),
  location text not null,
  image_url text,
  user_id uuid references auth.users not null,
  status text not null default 'open',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Posts table
create table public.posts (
  id uuid default uuid_generate_v4() primary key,
  content text not null,
  images text[] default array[]::text[],
  user_id uuid references auth.users not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Resources table
create table public.resources (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text not null,
  course text not null,
  file_url text not null,
  file_name text not null,
  file_type text not null,
  file_size bigint not null,
  user_id uuid references auth.users not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Messages table
create table public.messages (
  id uuid default uuid_generate_v4() primary key,
  content text not null,
  sender_id uuid references auth.users not null,
  receiver_id uuid references auth.users not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.books enable row level security;
alter table public.study_groups enable row level security;
alter table public.group_members enable row level security;
alter table public.lost_found enable row level security;
alter table public.posts enable row level security;
alter table public.resources enable row level security;
alter table public.messages enable row level security;

-- Create policies
create policy "Public read access"
  on public.books for select
  using ( true );

create policy "Users can create their own book listings"
  on public.books for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own book listings"
  on public.books for update
  using ( auth.uid() = user_id );

create policy "Public read access"
  on public.study_groups for select
  using ( true );

create policy "Users can create study groups"
  on public.study_groups for insert
  with check ( auth.uid() = created_by );

create policy "Group admins can update study groups"
  on public.study_groups for update
  using (
    exists (
      select 1 from public.group_members
      where group_id = id
      and user_id = auth.uid()
      and role = 'admin'
    )
  );

create policy "Public read access"
  on public.group_members for select
  using ( true );

create policy "Users can join groups"
  on public.group_members for insert
  with check ( auth.uid() = user_id );

create policy "Group admins can manage members"
  on public.group_members for update
  using (
    exists (
      select 1 from public.group_members
      where group_id = group_id
      and user_id = auth.uid()
      and role = 'admin'
    )
  );

create policy "Public read access"
  on public.lost_found for select
  using ( true );

create policy "Users can create lost and found reports"
  on public.lost_found for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own reports"
  on public.lost_found for update
  using ( auth.uid() = user_id );

create policy "Public read access"
  on public.posts for select
  using ( true );

create policy "Users can create posts"
  on public.posts for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own posts"
  on public.posts for update
  using ( auth.uid() = user_id );

create policy "Public read access"
  on public.resources for select
  using ( true );

create policy "Users can upload resources"
  on public.resources for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own resources"
  on public.resources for update
  using ( auth.uid() = user_id );

create policy "Users can read their own messages"
  on public.messages for select
  using ( auth.uid() in (sender_id, receiver_id) );

create policy "Users can send messages"
  on public.messages for insert
  with check ( auth.uid() = sender_id );

-- Create indexes
create index books_user_id_idx on public.books(user_id);
create index study_groups_created_by_idx on public.study_groups(created_by);
create index group_members_group_id_idx on public.group_members(group_id);
create index group_members_user_id_idx on public.group_members(user_id);
create index lost_found_user_id_idx on public.lost_found(user_id);
create index posts_user_id_idx on public.posts(user_id);
create index resources_user_id_idx on public.resources(user_id);
create index messages_sender_id_idx on public.messages(sender_id);
create index messages_receiver_id_idx on public.messages(receiver_id);
