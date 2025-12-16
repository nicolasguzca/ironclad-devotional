import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronRight,
  Edit2,
  Book,
  Bell,
  Clock,
  PlaySquare,
  Moon,
  HelpCircle,
  FileText,
  ExternalLink,
} from 'lucide-react-native';
import { neumorphicColors, neumorphicShadows } from '@/constants/neumorphic';
import { NeumorphicCard } from '@/components/ui/neumorphic-card';
import { useApp } from '@/contexts/app-context';

export default function ProfileScreen() {
  const router = useRouter();
  const { userProfile, isPremium } = useApp();
  const [dailyReminderEnabled, setDailyReminderEnabled] = React.useState(
    userProfile?.daily_reminder_enabled || true
  );
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);
  const [autoplayEnabled, setAutoplayEnabled] = React.useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.doneButton}>Done</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <NeumorphicCard style={styles.profileCard}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=33' }}
            style={styles.profileAvatar}
          />
          <TouchableOpacity style={styles.editBadge}>
            <Edit2 size={16} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.profileName}>
            {userProfile?.display_name || 'Joshua Miller'}
          </Text>
          <Text style={styles.memberSince}>Member since 2023</Text>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </NeumorphicCard>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACCOUNT</Text>
          <NeumorphicCard style={styles.settingsCard}>
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Email</Text>
              <Text style={styles.settingValue}>
                {userProfile?.user_id ? 'joshua.miller@example.com' : 'Not set'}
              </Text>
            </View>
            <View style={styles.separator} />
            <TouchableOpacity style={styles.settingItemClickable}>
              <Text style={styles.settingLabel}>Change Password</Text>
              <ChevronRight size={20} color={neumorphicColors.text.tertiary} />
            </TouchableOpacity>
          </NeumorphicCard>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DEVOTIONAL</Text>
          <NeumorphicCard style={styles.settingsCard}>
            <TouchableOpacity style={styles.settingItemClickable}>
              <View style={styles.settingLeft}>
                <Book size={20} color={neumorphicColors.accent.primary} />
                <Text style={styles.settingLabel}>Bible Translation</Text>
              </View>
              <View style={styles.settingRight}>
                <Text style={styles.settingValue}>
                  {userProfile?.bible_translation || 'ESV'}
                </Text>
                <ChevronRight size={20} color={neumorphicColors.text.tertiary} />
              </View>
            </TouchableOpacity>
            <View style={styles.separator} />
            <View style={styles.settingItemClickable}>
              <View style={styles.settingLeft}>
                <Bell size={20} color={neumorphicColors.accent.primary} />
                <Text style={styles.settingLabel}>Daily Reminder</Text>
              </View>
              <Switch
                value={dailyReminderEnabled}
                onValueChange={setDailyReminderEnabled}
                trackColor={{
                  false: neumorphicColors.text.tertiary,
                  true: neumorphicColors.accent.primary,
                }}
              />
            </View>
            <View style={styles.separator} />
            <TouchableOpacity style={styles.settingItemClickable}>
              <View style={styles.settingLeft}>
                <Clock size={20} color={neumorphicColors.accent.primary} />
                <Text style={styles.settingLabel}>Time</Text>
              </View>
              <View style={styles.settingRight}>
                <Text style={styles.settingValue}>07:00 AM</Text>
              </View>
            </TouchableOpacity>
          </NeumorphicCard>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>APP PREFERENCES</Text>
          <NeumorphicCard style={styles.settingsCard}>
            <View style={styles.settingItemClickable}>
              <View style={styles.settingLeft}>
                <PlaySquare size={20} color={neumorphicColors.text.tertiary} />
                <Text style={styles.settingLabel}>Video Autoplay</Text>
              </View>
              <Switch
                value={autoplayEnabled}
                onValueChange={setAutoplayEnabled}
                trackColor={{
                  false: neumorphicColors.text.tertiary,
                  true: neumorphicColors.accent.primary,
                }}
              />
            </View>
            <View style={styles.separator} />
            <View style={styles.settingItemClickable}>
              <View style={styles.settingLeft}>
                <Moon size={20} color={neumorphicColors.text.tertiary} />
                <Text style={styles.settingLabel}>Dark Mode</Text>
              </View>
              <Switch
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
                trackColor={{
                  false: neumorphicColors.text.tertiary,
                  true: neumorphicColors.accent.primary,
                }}
              />
            </View>
          </NeumorphicCard>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SUPPORT & LEGAL</Text>
          <NeumorphicCard style={styles.settingsCard}>
            <TouchableOpacity style={styles.settingItemClickable}>
              <View style={styles.settingLeft}>
                <HelpCircle size={20} color={neumorphicColors.text.tertiary} />
                <Text style={styles.settingLabel}>Help Center</Text>
              </View>
              <ExternalLink size={20} color={neumorphicColors.text.tertiary} />
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity style={styles.settingItemClickable}>
              <View style={styles.settingLeft}>
                <FileText size={20} color={neumorphicColors.text.tertiary} />
                <Text style={styles.settingLabel}>Privacy Policy</Text>
              </View>
              <ExternalLink size={20} color={neumorphicColors.text.tertiary} />
            </TouchableOpacity>
          </NeumorphicCard>
        </View>

        <TouchableOpacity style={styles.signOutButton}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Version 1.0.2</Text>

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
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: neumorphicColors.text.primary,
  },
  doneButton: {
    fontSize: 16,
    fontWeight: '600',
    color: neumorphicColors.accent.primary,
  },
  scrollView: {
    flex: 1,
  },
  profileCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    alignItems: 'center',
    paddingVertical: 32,
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  editBadge: {
    position: 'absolute',
    top: 100,
    right: '36%',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: neumorphicColors.accent.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: neumorphicColors.text.primary,
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 14,
    color: neumorphicColors.text.tertiary,
    marginBottom: 20,
  },
  editProfileButton: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: neumorphicColors.background,
    ...neumorphicShadows.card,
  },
  editProfileText: {
    fontSize: 15,
    fontWeight: '600',
    color: neumorphicColors.text.primary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: neumorphicColors.text.tertiary,
    letterSpacing: 1,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  settingsCard: {
    marginHorizontal: 20,
    padding: 0,
  },
  settingItem: {
    padding: 16,
  },
  settingItemClickable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingLabel: {
    fontSize: 16,
    color: neumorphicColors.text.primary,
  },
  settingValue: {
    fontSize: 15,
    color: neumorphicColors.text.tertiary,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(163, 177, 198, 0.2)',
    marginHorizontal: 16,
  },
  signOutButton: {
    marginHorizontal: 20,
    marginTop: 24,
    paddingVertical: 16,
    alignItems: 'center',
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
  version: {
    fontSize: 13,
    color: neumorphicColors.text.tertiary,
    textAlign: 'center',
    marginTop: 16,
  },
});
