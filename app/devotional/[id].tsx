import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Share2, BookmarkPlus, Copy, PlayCircle, Sparkles } from 'lucide-react-native';
import { neumorphicColors, neumorphicShadows } from '@/constants/neumorphic';
import { NeumorphicCard } from '@/components/ui/neumorphic-card';
import { NeumorphicButton } from '@/components/ui/neumorphic-button';
import { supabase } from '@/lib/supabase';

interface Devotional {
  id: string;
  title: string;
  subtitle: string;
  scripture_reference: string;
  scripture_text: string;
  content: string;
  prayer: string;
  image_url: string;
  series: string;
  date: string;
  read_time: number;
  is_premium: boolean;
}

export default function DevotionalDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [devotional, setDevotional] = useState<Devotional | null>(null);

  useEffect(() => {
    loadDevotional();
  }, [id]);

  const loadDevotional = async () => {
    try {
      const { data } = await supabase
        .from('devotionals')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (data) {
        setDevotional(data);
      }
    } catch (error) {
      console.error('Error loading devotional:', error);
    }
  };

  if (!devotional) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerNav}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={neumorphicColors.text.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton}>
          <Share2 size={24} color={neumorphicColors.text.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: devotional.image_url }}
          style={styles.headerImage}
        />

        <View style={styles.content}>
          <Text style={styles.series}>{devotional.series}</Text>
          <Text style={styles.date}>OCT 24</Text>

          <Text style={styles.title}>{devotional.title}</Text>

          <NeumorphicCard style={styles.scriptureCard}>
            <View style={styles.scriptureHeader}>
              <Text style={styles.scriptureQuote}>"</Text>
              <Text style={styles.scriptureText}>
                {devotional.scripture_text}
              </Text>
              <Text style={styles.scriptureQuote}>"</Text>
            </View>
            <View style={styles.scriptureFooter}>
              <Text style={styles.scriptureReference}>
                {devotional.scripture_reference}
              </Text>
              <View style={styles.scriptureActions}>
                <TouchableOpacity style={styles.scriptureAction}>
                  <BookmarkPlus size={18} color={neumorphicColors.text.tertiary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.scriptureAction}>
                  <Copy size={18} color={neumorphicColors.text.tertiary} />
                </TouchableOpacity>
              </View>
            </View>
          </NeumorphicCard>

          {devotional.content.split('\n\n').map((paragraph, index) => (
            <Text key={index} style={styles.paragraph}>
              {paragraph}
            </Text>
          ))}

          <NeumorphicCard style={styles.videoCard}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg' }}
              style={styles.videoThumbnail}
            />
            <View style={styles.videoPlay}>
              <PlayCircle size={48} color="#FFFFFF" />
            </View>
            <View style={styles.videoDuration}>
              <Text style={styles.videoDurationText}>04:20</Text>
            </View>
            <View style={styles.videoInfo}>
              <Text style={styles.videoTitle}>Deep Dive: The Cost of Compromise</Text>
              <Text style={styles.videoMeta}>Pastor Michael Todd • 1.2k views</Text>
            </View>
          </NeumorphicCard>

          <NeumorphicCard style={styles.prayerCard}>
            <View style={styles.prayerHeader}>
              <Sparkles size={20} color={neumorphicColors.accent.primary} />
              <Text style={styles.prayerLabel}>DAILY PRAYER</Text>
            </View>
            <Text style={styles.prayerText}>{devotional.prayer}</Text>
          </NeumorphicCard>

          <NeumorphicButton
            title="Complete Day"
            onPress={() => router.back()}
            style={styles.completeButton}
          />

          <View style={{ height: 30 }} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: neumorphicColors.background,
  },
  headerNav: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: neumorphicColors.background,
    justifyContent: 'center',
    alignItems: 'center',
    ...neumorphicShadows.card,
  },
  shareButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: neumorphicColors.background,
    justifyContent: 'center',
    alignItems: 'center',
    ...neumorphicShadows.card,
  },
  scrollView: {
    flex: 1,
  },
  headerImage: {
    width: '100%',
    height: 300,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  series: {
    fontSize: 13,
    fontWeight: '600',
    color: neumorphicColors.accent.primary,
    marginBottom: 4,
  },
  date: {
    fontSize: 11,
    fontWeight: '600',
    color: neumorphicColors.text.tertiary,
    letterSpacing: 1,
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: neumorphicColors.text.primary,
    marginBottom: 24,
  },
  scriptureCard: {
    marginBottom: 24,
    padding: 20,
  },
  scriptureHeader: {
    marginBottom: 12,
  },
  scriptureQuote: {
    fontSize: 40,
    fontWeight: '300',
    color: neumorphicColors.text.tertiary,
    lineHeight: 40,
  },
  scriptureText: {
    fontSize: 16,
    lineHeight: 26,
    color: neumorphicColors.text.primary,
    fontStyle: 'italic',
    marginTop: -30,
    marginBottom: -10,
    marginLeft: 20,
  },
  scriptureFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scriptureReference: {
    fontSize: 14,
    fontWeight: '600',
    color: neumorphicColors.accent.primary,
  },
  scriptureActions: {
    flexDirection: 'row',
    gap: 8,
  },
  scriptureAction: {
    padding: 8,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 28,
    color: neumorphicColors.text.secondary,
    marginBottom: 20,
  },
  videoCard: {
    marginBottom: 24,
    padding: 0,
    overflow: 'hidden',
  },
  videoThumbnail: {
    width: '100%',
    height: 200,
  },
  videoPlay: {
    position: 'absolute',
    top: '28%',
    left: '50%',
    marginLeft: -24,
    marginTop: -24,
  },
  videoDuration: {
    position: 'absolute',
    top: 160,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  videoDurationText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  videoInfo: {
    padding: 16,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: neumorphicColors.text.primary,
    marginBottom: 4,
  },
  videoMeta: {
    fontSize: 13,
    color: neumorphicColors.text.tertiary,
  },
  prayerCard: {
    marginBottom: 24,
  },
  prayerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  prayerLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: neumorphicColors.accent.primary,
    letterSpacing: 1,
  },
  prayerText: {
    fontSize: 15,
    lineHeight: 24,
    color: neumorphicColors.text.secondary,
  },
  completeButton: {
    width: '100%',
  },
});
