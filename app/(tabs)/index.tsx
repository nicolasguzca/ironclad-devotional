import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Clock, Headphones, BookOpen, PlayCircle, Edit3, Users, Bell, Share2 } from 'lucide-react-native';
import { neumorphicColors, neumorphicShadows } from '@/constants/neumorphic';
import { NeumorphicCard } from '@/components/ui/neumorphic-card';
import { NeumorphicButton } from '@/components/ui/neumorphic-button';
import { useApp } from '@/contexts/app-context';
import { supabase } from '@/lib/supabase';

const { width } = Dimensions.get('window');

interface Devotional {
  id: string;
  title: string;
  subtitle: string;
  scripture_reference: string;
  scripture_text: string;
  image_url: string;
  read_time: number;
  is_premium: boolean;
}

export default function HomeScreen() {
  const router = useRouter();
  const { userProfile, userStats } = useApp();
  const [selectedDate, setSelectedDate] = useState(25);
  const [currentDevotional, setCurrentDevotional] = useState<Devotional | null>(null);

  useEffect(() => {
    loadDevotional();
  }, []);

  const loadDevotional = async () => {
    try {
      const { data } = await supabase
        .from('devotionals')
        .select('*')
        .order('date', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (data) {
        setCurrentDevotional(data);
      }
    } catch (error) {
      console.error('Error loading devotional:', error);
    }
  };

  const dates = [
    { day: 'Mon', date: 23 },
    { day: 'Tue', date: 24 },
    { day: 'Wed', date: 25 },
    { day: 'Thu', date: 26 },
    { day: 'Fri', date: 27 },
    { day: 'Sat', date: 28 },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.greeting}>Good Morning,</Text>
              <Text style={styles.userName}>{userProfile?.display_name || 'David'}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color={neumorphicColors.accent.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.dateHeader}>
          <Text style={styles.monthYear}>OCTOBER 2023</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.dateScroll}
        >
          {dates.map((item) => (
            <TouchableOpacity
              key={item.date}
              onPress={() => setSelectedDate(item.date)}
              style={[
                styles.dateCard,
                item.date === selectedDate && styles.dateCardActive
              ]}
            >
              <Text style={[
                styles.dateDay,
                item.date === selectedDate && styles.dateDayActive
              ]}>
                {item.day}
              </Text>
              <Text style={[
                styles.dateNumber,
                item.date === selectedDate && styles.dateNumberActive
              ]}>
                {item.date}
              </Text>
              {item.date <= selectedDate && item.date >= 23 && (
                <View style={styles.dateDot} />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {currentDevotional && (
          <NeumorphicCard style={styles.devotionalCard}>
            <Image
              source={{ uri: currentDevotional.image_url }}
              style={styles.devotionalImage}
            />
            <View style={styles.bookmarkButton}>
              <BookOpen size={20} color={neumorphicColors.accent.primary} />
            </View>
            <View style={styles.devotionalContent}>
              <Text style={styles.devotionalLabel}>DAILY DEVOTIONAL</Text>
              <Text style={styles.devotionalTitle}>{currentDevotional.title}</Text>
              <Text style={styles.devotionalSubtitle}>{currentDevotional.subtitle}</Text>

              <View style={styles.devotionalMeta}>
                <View style={styles.metaItem}>
                  <Clock size={16} color={neumorphicColors.text.tertiary} />
                  <Text style={styles.metaText}>{currentDevotional.read_time} min read</Text>
                </View>
                <View style={styles.metaItem}>
                  <Headphones size={16} color={neumorphicColors.text.tertiary} />
                  <Text style={styles.metaText}>Audio available</Text>
                </View>
              </View>

              <View style={styles.progressContainer}>
                <Text style={styles.progressLabel}>Daily Progress</Text>
                <Text style={styles.progressValue}>35%</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '35%' }]} />
              </View>

              <NeumorphicButton
                title="Continue Reading"
                onPress={() => router.push(`/devotional/${currentDevotional.id}`)}
                style={styles.continueButton}
              />
            </View>
          </NeumorphicCard>
        )}

        <NeumorphicCard style={styles.verseCard}>
          <View style={styles.verseHeader}>
            <Text style={styles.verseLabel}>VERSE OF THE DAY</Text>
            <TouchableOpacity>
              <Share2 size={20} color={neumorphicColors.text.tertiary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.verseText}>
            "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go."
          </Text>
          <Text style={styles.verseReference}>— Joshua 1:9</Text>
        </NeumorphicCard>

        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/bible')}>
            <View style={styles.actionIconContainer}>
              <BookOpen size={28} color={neumorphicColors.accent.primary} />
            </View>
            <Text style={styles.actionTitle}>Bible Reader</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/library')}>
            <View style={styles.actionIconContainer}>
              <PlayCircle size={28} color="#EF4444" />
            </View>
            <Text style={styles.actionTitle}>Video Library</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionIconContainer}>
              <Edit3 size={28} color="#8B5CF6" />
            </View>
            <Text style={styles.actionTitle}>Prayer Journal</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionIconContainer}>
              <Users size={28} color="#10B981" />
            </View>
            <Text style={styles.actionTitle}>Community</Text>
          </TouchableOpacity>
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  greeting: {
    fontSize: 14,
    color: neumorphicColors.text.tertiary,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: neumorphicColors.text.primary,
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: neumorphicColors.background,
    justifyContent: 'center',
    alignItems: 'center',
    ...neumorphicShadows.card,
  },
  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  monthYear: {
    fontSize: 12,
    fontWeight: '600',
    color: neumorphicColors.text.tertiary,
    letterSpacing: 1,
  },
  viewAll: {
    fontSize: 14,
    color: neumorphicColors.accent.primary,
    fontWeight: '600',
  },
  dateScroll: {
    paddingLeft: 20,
    marginBottom: 24,
  },
  dateCard: {
    width: 60,
    height: 80,
    borderRadius: 16,
    backgroundColor: neumorphicColors.background,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    ...neumorphicShadows.card,
  },
  dateCardActive: {
    backgroundColor: neumorphicColors.accent.primary,
  },
  dateDay: {
    fontSize: 12,
    color: neumorphicColors.text.tertiary,
    marginBottom: 4,
  },
  dateDayActive: {
    color: '#FFFFFF',
  },
  dateNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: neumorphicColors.text.primary,
  },
  dateNumberActive: {
    color: '#FFFFFF',
  },
  dateDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: neumorphicColors.accent.primary,
    marginTop: 4,
  },
  devotionalCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 0,
    overflow: 'hidden',
  },
  devotionalImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  bookmarkButton: {
    position: 'absolute',
    top: 140,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: neumorphicColors.background,
    justifyContent: 'center',
    alignItems: 'center',
    ...neumorphicShadows.card,
  },
  devotionalContent: {
    padding: 20,
  },
  devotionalLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: neumorphicColors.text.tertiary,
    letterSpacing: 1,
    marginBottom: 8,
  },
  devotionalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: neumorphicColors.text.primary,
    marginBottom: 4,
  },
  devotionalSubtitle: {
    fontSize: 14,
    color: neumorphicColors.text.secondary,
    marginBottom: 16,
  },
  devotionalMeta: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    color: neumorphicColors.text.tertiary,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: neumorphicColors.text.primary,
  },
  progressValue: {
    fontSize: 14,
    fontWeight: '600',
    color: neumorphicColors.accent.primary,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    borderRadius: 3,
    marginBottom: 20,
  },
  progressFill: {
    height: '100%',
    backgroundColor: neumorphicColors.accent.primary,
    borderRadius: 3,
  },
  continueButton: {
    width: '100%',
  },
  verseCard: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  verseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  verseLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: neumorphicColors.text.tertiary,
    letterSpacing: 1,
  },
  verseText: {
    fontSize: 16,
    lineHeight: 26,
    color: neumorphicColors.text.primary,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  verseReference: {
    fontSize: 14,
    fontWeight: '600',
    color: neumorphicColors.accent.primary,
    textAlign: 'right',
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 16,
  },
  actionCard: {
    flex: 1,
    backgroundColor: neumorphicColors.background,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    ...neumorphicShadows.card,
  },
  actionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: neumorphicColors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    ...neumorphicShadows.card,
  },
  actionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: neumorphicColors.text.primary,
    textAlign: 'center',
  },
});
