import React, { FC, useState, useEffect, useCallback } from 'react';

import LazyImage from '../../components/LazyImage';

import { FlatList } from 'react-native';

import {
  Container,
  Post,
  Header,
  Avatar,
  Name,
  Description,
  Loading,
} from './styles';

export interface Feed {
  id?: number;
  image: string;
  small: string;
  aspectRatio: number;
  description: string;
  author: {
    id?: number;
    name: string;
    avatar: string;
  }
};

const Feed: FC = () => {
  const [feed, setFeed] = useState<Array<Feed>>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [viewable, setViewable] = useState<Array<Feed>>([]);

  async function loadPage(pageNumber = page, shouldRefresh = false) {
    if (total && pageNumber > total) return;
    
    setLoading(true);

    const response = await fetch(
      `http://192.168.1.26:3000/feed?_expand=author&_limit=5&_page=${pageNumber}`
    );

    const data = await response.json();
    const totalPosts = response.headers.get('X-Total-Count');

    setTotal(Math.ceil(Number(totalPosts) / 5));
    setFeed(shouldRefresh ? data : [...feed, ...data]);
    setPage(pageNumber + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadPage();
  }, []);

  async function refreshList() {
    setRefreshing(true);

    await loadPage(1, true);

    setRefreshing(false);
  }

  const handleOnViewableChanged = useCallback(({ changed }) => {
    setViewable(changed.map((m: any) => m.item.id));
  }, []);

  return (
    <Container>
      <FlatList<Feed>
        data={feed}
        keyExtractor={post => String(post.id)}
        onEndReached={() => loadPage()}
        onEndReachedThreshold={0.1}
        onRefresh={refreshList}
        refreshing={refreshing}
        onViewableItemsChanged={handleOnViewableChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 20 }}
        ListFooterComponent={loading && <Loading />}
        renderItem={({ item }) => (
          <Post>
            <Header>
              <Avatar source={{ uri: item.author.avatar }} />
              <Name>{item.author.name}</Name>
            </Header>
            <LazyImage
              shouldLoad={viewable.includes(item.id)}
              source={{ uri: item.image }}
              ratio={item.aspectRatio}
              smallSource={{ uri: item.small}}
            />
            <Description>
              <Name>{item.author.name}</Name> {item.description}
            </Description>
          </Post>
        )}
      />
    </Container>
  );
};

export default Feed;
