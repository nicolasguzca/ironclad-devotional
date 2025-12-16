import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { ChevronDown, BookOpen, Search, Lock } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { neumorphicColors, neumorphicShadows } from '@/constants/neumorphic';
import { NeumorphicCard } from '@/components/ui/neumorphic-card';
import { useApp } from '@/contexts/app-context';

export default function BibleScreen() {
  const router = useRouter();
  const { isPremium, userProfile } = useApp();
  const [showStudyNotes, setShowStudyNotes] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <BookOpen size={28} color={neumorphicColors.accent.primary} />
          <View>
            <Text style={styles.headerTitle}>Bible Reader</Text>
            <TouchableOpacity style={styles.translationSelector}>
              <Text style={styles.translationText}>
                {userProfile?.bible_translation || 'ESV'}
              </Text>
              <ChevronDown size={16} color={neumorphicColors.text.tertiary} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.searchButton}>
          <Search size={24} color={neumorphicColors.accent.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.bookSelector}>
          <Text style={styles.currentBook}>Genesis • Chapter 1</Text>
          <TouchableOpacity>
            <ChevronDown size={24} color={neumorphicColors.text.primary} />
          </TouchableOpacity>
        </View>

        <NeumorphicCard style={styles.bibleCard}>
          <View style={styles.verseContainer}>
            <Text style={styles.verseNumber}>1</Text>
            <Text style={styles.verseText}>
              In the beginning, God created the heavens and the earth.
            </Text>
          </View>

          <View style={styles.verseContainer}>
            <Text style={styles.verseNumber}>2</Text>
            <Text style={styles.verseText}>
              The earth was without form and void, and darkness was over the face of
              the deep. And the Spirit of God was hovering over the face of the waters.
            </Text>
          </View>

          <View style={styles.verseContainer}>
            <Text style={styles.verseNumber}>3</Text>
            <Text style={styles.verseText}>
              And God said, "Let there be light," and there was light.
            </Text>
          </View>

          <View style={styles.verseContainer}>
            <Text style={styles.verseNumber}>4</Text>
            <Text style={styles.verseText}>
              And God saw that the light was good. And God separated the light from the
              darkness.
            </Text>
          </View>

          <View style={styles.verseContainer}>
            <Text style={styles.verseNumber}>5</Text>
            <Text style={styles.verseText}>
              God called the light Day, and the darkness he called Night. And there was
              evening and there was morning, the first day.
            </Text>
          </View>
        </NeumorphicCard>

        <TouchableOpacity
          style={styles.studyNotesToggle}
          onPress={() => {
            if (!isPremium) {
              router.push('/paywall');
            } else {
              setShowStudyNotes(!showStudyNotes);
            }
          }}
        >
          <View style={styles.toggleLeft}>
            <BookOpen size={20} color={neumorphicColors.accent.primary} />
            <Text style={styles.toggleText}>Study Notes</Text>
            {!isPremium && <Lock size={16} color={neumorphicColors.text.tertiary} />}
          </View>
          <ChevronDown
            size={20}
            color={neumorphicColors.text.tertiary}
            style={showStudyNotes ? styles.chevronUp : undefined}
          />
        </TouchableOpacity>

        {showStudyNotes && isPremium && (
          <NeumorphicCard style={styles.studyNotesCard}>
            <Text style={styles.studyNotesTitle}>Context & Background</Text>
            <Text style={styles.studyNotesText}>
              Genesis opens with the majestic account of creation. The Hebrew word for
              "beginning" (bereshit) indicates an absolute beginning, before which there
              was nothing but God.
            </Text>
            <Text style={styles.studyNotesText}>
              The phrase "the Spirit of God was hovering" uses a Hebrew word (merahefet)
              that suggests protective care, like a bird hovering over its nest.
            </Text>
          </NeumorphicCard>
        )}

        <View style={styles.navigationButtons}>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navButtonText}>Previous Chapter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navButton, styles.navButtonPrimary]}>
            <Text style={styles.navButtonTextPrimary}>Next Chapter</Text>
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
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: neumorphicColors.text.primary,
  },
  translationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  translationText: {
    fontSize: 13,
    color: neumorphicColors.text.tertiary,
  },
  searchButton: {
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
  bookSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  currentBook: {
    fontSize: 16,
    fontWeight: '600',
    color: neumorphicColors.text.primary,
  },
  bibleCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 24,
  },
  verseContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  verseNumber: {
    fontSize: 12,
    fontWeight: '700',
    color: neumorphicColors.accent.primary,
    marginRight: 12,
    marginTop: 4,
    width: 20,
  },
  verseText: {
    flex: 1,
    fontSize: 17,
    lineHeight: 28,
    color: neumorphicColors.text.primary,
  },
  studyNotesToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: neumorphicColors.background,
    ...neumorphicShadows.card,
  },
  toggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '600',
    color: neumorphicColors.text.primary,
  },
  chevronUp: {
    transform: [{ rotate: '180deg' }],
  },
  studyNotesCard: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  studyNotesTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: neumorphicColors.text.primary,
    marginBottom: 12,
  },
  studyNotesText: {
    fontSize: 15,
    lineHeight: 24,
    color: neumorphicColors.text.secondary,
    marginBottom: 16,
  },
  navigationButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  navButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: neumorphicColors.background,
    alignItems: 'center',
    ...neumorphicShadows.card,
  },
  navButtonPrimary: {
    backgroundColor: neumorphicColors.accent.primary,
  },
  navButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: neumorphicColors.text.primary,
  },
  navButtonTextPrimary: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
