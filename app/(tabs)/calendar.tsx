import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, ChevronRight, Flame, Flag, BookOpen } from 'lucide-react-native';
import { neumorphicColors, neumorphicShadows } from '@/constants/neumorphic';
import { NeumorphicCard } from '@/components/ui/neumorphic-card';
import { NeumorphicButton } from '@/components/ui/neumorphic-button';
import { useApp } from '@/contexts/app-context';

export default function CalendarScreen() {
  const router = useRouter();
  const { userStats } = useApp();
  const [currentMonth, setCurrentMonth] = useState('October 2023');

  const calendarDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const calendarDates = [
    [null, null, null, null, null, 1, 2],
    [3, 4, 5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14, 15, 16],
    [17, 18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29, 30],
    [31, null, null, null, null, null, null],
  ];

  const completedDates = [1, 2, 3, 4, 5, 8, 9];
  const currentDate = 12;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.navButton}>
            <ChevronLeft size={24} color={neumorphicColors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.monthTitle}>{currentMonth}</Text>
          <TouchableOpacity style={styles.navButton}>
            <ChevronRight size={24} color={neumorphicColors.text.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <NeumorphicCard style={styles.statCard}>
            <View style={styles.statIcon}>
              <Flame size={24} color="#FF6B35" />
            </View>
            <Text style={styles.statLabel}>STREAK</Text>
            <Text style={styles.statValue}>{userStats?.current_streak || 12} Days</Text>
          </NeumorphicCard>

          <NeumorphicCard style={styles.statCard}>
            <View style={styles.statIcon}>
              <Flag size={24} color={neumorphicColors.accent.primary} />
            </View>
            <Text style={styles.statLabel}>GOAL</Text>
            <View style={styles.goalContent}>
              <Text style={styles.statValue}>{userStats?.goal_percentage || 85}%</Text>
              <Text style={styles.goalStatus}>On track</Text>
            </View>
          </NeumorphicCard>
        </View>

        <NeumorphicCard style={styles.calendarCard}>
          <View style={styles.calendarHeader}>
            {calendarDays.map((day, index) => (
              <Text key={index} style={styles.dayLabel}>
                {day}
              </Text>
            ))}
          </View>

          {calendarDates.map((week, weekIndex) => (
            <View key={weekIndex} style={styles.calendarRow}>
              {week.map((date, dateIndex) => {
                const isCompleted = date && completedDates.includes(date);
                const isCurrent = date === currentDate;
                const isEmpty = date === null;

                return (
                  <TouchableOpacity
                    key={dateIndex}
                    style={[
                      styles.dateCell,
                      isEmpty && styles.dateCellEmpty,
                      isCurrent && styles.dateCellCurrent,
                    ]}
                    disabled={isEmpty}
                  >
                    {!isEmpty && (
                      <>
                        <Text
                          style={[
                            styles.dateText,
                            isCurrent && styles.dateTextCurrent,
                          ]}
                        >
                          {date}
                        </Text>
                        {isCompleted && !isCurrent && (
                          <View style={styles.completedDot} />
                        )}
                      </>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </NeumorphicCard>

        <NeumorphicCard style={styles.devotionalPreview}>
          <View style={styles.previewHeader}>
            <View>
              <Text style={styles.previewTitle}>Walking in Integrity</Text>
              <Text style={styles.previewReference}>Proverbs 10:9</Text>
            </View>
            <View style={styles.iconButton}>
              <BookOpen size={24} color={neumorphicColors.accent.primary} />
            </View>
          </View>

          <Text style={styles.previewMeta}>Oct 4th • Daily Devotional</Text>

          <NeumorphicButton
            title="Read Now"
            onPress={() => router.push('/devotional/2')}
            style={styles.readButton}
          />
        </NeumorphicCard>

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
    paddingBottom: 24,
  },
  navButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: neumorphicColors.background,
    justifyContent: 'center',
    alignItems: 'center',
    ...neumorphicShadows.card,
  },
  monthTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: neumorphicColors.text.primary,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  statIcon: {
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: neumorphicColors.text.tertiary,
    letterSpacing: 1,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: neumorphicColors.text.primary,
  },
  goalContent: {
    alignItems: 'center',
  },
  goalStatus: {
    fontSize: 14,
    color: neumorphicColors.success,
    marginTop: 4,
  },
  calendarCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    paddingVertical: 24,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  dayLabel: {
    width: 40,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: neumorphicColors.text.tertiary,
  },
  calendarRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  dateCell: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: neumorphicColors.background,
    ...neumorphicShadows.card,
  },
  dateCellEmpty: {
    backgroundColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  dateCellCurrent: {
    backgroundColor: neumorphicColors.accent.primary,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: neumorphicColors.text.primary,
  },
  dateTextCurrent: {
    color: '#FFFFFF',
  },
  completedDot: {
    position: 'absolute',
    bottom: 6,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: neumorphicColors.accent.primary,
  },
  devotionalPreview: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  previewTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: neumorphicColors.text.primary,
    marginBottom: 4,
  },
  previewReference: {
    fontSize: 14,
    fontWeight: '600',
    color: neumorphicColors.accent.primary,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: neumorphicColors.background,
    justifyContent: 'center',
    alignItems: 'center',
    ...neumorphicShadows.card,
  },
  previewMeta: {
    fontSize: 13,
    color: neumorphicColors.text.tertiary,
    marginBottom: 20,
  },
  readButton: {
    width: '100%',
  },
});
