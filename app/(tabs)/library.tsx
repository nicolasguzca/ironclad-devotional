import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Menu, PlayCircle, Lock, MoreVertical } from 'lucide-react-native';
import { neumorphicColors, neumorphicShadows } from '@/constants/neumorphic';
import { NeumorphicCard } from '@/components/ui/neumorphic-card';
import { useApp } from '@/contexts/app-context';
import { supabase } from '@/lib/supabase';

interface Video {
  id: string;
  title: string;
  description: string;
  pastor: string;
  thumbnail_url: string;
  duration: number;
  views: number;
  category: string;
  is_premium: boolean;
}

export default function LibraryScreen() {
  const router = useRouter();
  const { isPremium } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [videos, setVideos] = useState<Video[]>([]);
  const [featuredVideo, setFeaturedVideo] = useState<Video | null>(null);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const { data } = await supabase
        .from('videos')
        .select('*')
        .order('views', { ascending: false });

      if (data && data.length > 0) {
        setFeaturedVideo(data[0]);
        setVideos(data.slice(1));
      }
    } catch (error) {
      console.error('Error loading videos:', error);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const categories = ['All', 'Daily', 'Theology', 'Marriage'];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Library</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <Menu size={24} color={neumorphicColors.text.primary} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
                style={styles.avatar}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color={neumorphicColors.text.tertiary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search topics, scripture, pastors..."
              placeholderTextColor={neumorphicColors.text.tertiary}
            />
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {featuredVideo && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Featured Sermon</Text>
            <TouchableOpacity
              style={styles.featuredCard}
              onPress={() => {
                if (featuredVideo.is_premium && !isPremium) {
                  router.push('/paywall');
                }
              }}
            >
              <Image
                source={{ uri: featuredVideo.thumbnail_url }}
                style={styles.featuredImage}
              />
              <View style={styles.playButton}>
                {featuredVideo.is_premium && !isPremium ? (
                  <Lock size={28} color="#FFFFFF" />
                ) : (
                  <PlayCircle size={48} color="#FFFFFF" />
                )}
              </View>
              <View style={styles.videoDuration}>
                <Text style={styles.durationText}>{formatDuration(featuredVideo.duration)}</Text>
              </View>
              <View style={styles.featuredInfo}>
                <Text style={styles.featuredTitle}>{featuredVideo.title}</Text>
                <Text style={styles.featuredPastor}>{featuredVideo.pastor}</Text>
                <Text style={styles.featuredDate}>Oct 24</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Continue Watching</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
          >
            {videos.slice(0, 2).map((video) => (
              <TouchableOpacity
                key={video.id}
                style={styles.continueCard}
                onPress={() => {
                  if (video.is_premium && !isPremium) {
                    router.push('/paywall');
                  }
                }}
              >
                <Image
                  source={{ uri: video.thumbnail_url }}
                  style={styles.continueImage}
                />
                <View style={styles.continuePlayButton}>
                  {video.is_premium && !isPremium ? (
                    <Lock size={20} color="#FFFFFF" />
                  ) : (
                    <PlayCircle size={32} color="#FFFFFF" />
                  )}
                </View>
                <View style={styles.continueDuration}>
                  <Text style={styles.durationText}>{formatDuration(video.duration)}</Text>
                </View>
                <View style={styles.progressBar}>
                  <View style={[styles.progress, { width: '45%' }]} />
                </View>
                <Text style={styles.continueTitle}>{video.title}</Text>
                <Text style={styles.continueMeta}>
                  {video.pastor} • 12m left
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Latest Sermons</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {videos.slice(2).map((video) => (
            <TouchableOpacity
              key={video.id}
              style={styles.listItem}
              onPress={() => {
                if (video.is_premium && !isPremium) {
                  router.push('/paywall');
                }
              }}
            >
              <Image
                source={{ uri: video.thumbnail_url }}
                style={styles.listThumbnail}
              />
              <View style={styles.listPlayIcon}>
                {video.is_premium && !isPremium ? (
                  <Lock size={16} color="#FFFFFF" />
                ) : (
                  <PlayCircle size={24} color="#FFFFFF" />
                )}
              </View>
              <View style={styles.listDuration}>
                <Text style={styles.durationText}>{formatDuration(video.duration)}</Text>
              </View>
              <View style={styles.listContent}>
                <View style={styles.listInfo}>
                  <Text style={styles.listTitle}>{video.title}</Text>
                  <Text style={styles.listMeta}>{video.pastor}</Text>
                  <View style={styles.listTags}>
                    <Text style={styles.tag}>{video.category}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.moreButton}>
                  <MoreVertical size={20} color={neumorphicColors.text.tertiary} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: neumorphicColors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: neumorphicColors.text.primary,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: neumorphicColors.background,
    justifyContent: 'center',
    alignItems: 'center',
    ...neumorphicShadows.card,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: neumorphicColors.background,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    ...neumorphicShadows.pressed,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: neumorphicColors.text.primary,
  },
  categoriesScroll: {
    paddingLeft: 20,
    marginBottom: 24,
  },
  categoriesContent: {
    gap: 12,
    paddingRight: 20,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: neumorphicColors.background,
    ...neumorphicShadows.card,
  },
  categoryButtonActive: {
    backgroundColor: neumorphicColors.accent.primary,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: neumorphicColors.text.primary,
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: neumorphicColors.text.primary,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: neumorphicColors.accent.primary,
  },
  featuredCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: neumorphicColors.background,
    ...neumorphicShadows.card,
  },
  featuredImage: {
    width: '100%',
    height: 200,
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -24,
    marginLeft: -24,
  },
  videoDuration: {
    position: 'absolute',
    bottom: 80,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  featuredInfo: {
    padding: 16,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: neumorphicColors.text.primary,
    marginBottom: 4,
  },
  featuredPastor: {
    fontSize: 14,
    color: neumorphicColors.text.secondary,
    marginBottom: 4,
  },
  featuredDate: {
    fontSize: 13,
    color: neumorphicColors.text.tertiary,
  },
  horizontalScroll: {
    paddingLeft: 20,
  },
  continueCard: {
    width: 240,
    marginRight: 16,
    borderRadius: 16,
    backgroundColor: neumorphicColors.background,
    ...neumorphicShadows.card,
    overflow: 'hidden',
  },
  continueImage: {
    width: '100%',
    height: 135,
  },
  continuePlayButton: {
    position: 'absolute',
    top: '28%',
    left: '50%',
    marginTop: -16,
    marginLeft: -16,
  },
  continueDuration: {
    position: 'absolute',
    top: 100,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  progressBar: {
    height: 3,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
  },
  progress: {
    height: '100%',
    backgroundColor: neumorphicColors.accent.primary,
  },
  continueTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: neumorphicColors.text.primary,
    padding: 12,
    paddingBottom: 4,
  },
  continueMeta: {
    fontSize: 12,
    color: neumorphicColors.text.tertiary,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  listItem: {
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  listThumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  listPlayIcon: {
    position: 'absolute',
    top: '28%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  listDuration: {
    position: 'absolute',
    top: 165,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  listContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 12,
  },
  listInfo: {
    flex: 1,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: neumorphicColors.text.primary,
    marginBottom: 4,
  },
  listMeta: {
    fontSize: 13,
    color: neumorphicColors.text.tertiary,
    marginBottom: 8,
  },
  listTags: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    fontSize: 11,
    fontWeight: '600',
    color: neumorphicColors.text.tertiary,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  moreButton: {
    padding: 4,
  },
});
