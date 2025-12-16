import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { X, Check, Lock, Crown } from 'lucide-react-native';
import { neumorphicColors, neumorphicShadows } from '@/constants/neumorphic';
import { NeumorphicCard } from '@/components/ui/neumorphic-card';
import { NeumorphicButton } from '@/components/ui/neumorphic-button';
import { useApp } from '@/contexts/app-context';

export default function PaywallScreen() {
  const router = useRouter();
  const { setIsPremium } = useApp();

  const handleUpgrade = () => {
    setIsPremium(true);
    router.back();
  };

  const features = [
    'Unlimited access to all devotionals',
    'Exclusive theological deep dives',
    'Full video library access',
    'Bible study notes & commentary',
    'Offline reading & downloads',
    'Ad-free experience',
    'Priority customer support',
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => router.back()}
        >
          <X size={24} color={neumorphicColors.text.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Crown size={64} color={neumorphicColors.accent.primary} />
          </View>

          <Text style={styles.title}>Upgrade to Ironclad Premium</Text>
          <Text style={styles.subtitle}>
            Deepen your faith journey with unlimited access to all premium content
          </Text>

          <NeumorphicCard style={styles.featuresCard}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={styles.checkIcon}>
                  <Check size={20} color={neumorphicColors.accent.primary} />
                </View>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </NeumorphicCard>

          <NeumorphicCard style={styles.pricingCard}>
            <View style={styles.pricingHeader}>
              <View>
                <Text style={styles.pricingTitle}>Annual Plan</Text>
                <Text style={styles.pricingSavings}>Save 40%</Text>
              </View>
              <View style={styles.pricingAmount}>
                <Text style={styles.price}>$59.99</Text>
                <Text style={styles.pricePeriod}>/year</Text>
              </View>
            </View>
            <View style={styles.pricingDivider} />
            <View style={styles.pricingDetails}>
              <Text style={styles.pricingDetail}>• Billed annually</Text>
              <Text style={styles.pricingDetail}>• Cancel anytime</Text>
              <Text style={styles.pricingDetail}>• 7-day free trial</Text>
            </View>
          </NeumorphicCard>

          <NeumorphicButton
            title="Start Free Trial"
            onPress={handleUpgrade}
            style={styles.upgradeButton}
          />

          <TouchableOpacity style={styles.restoreButton}>
            <Text style={styles.restoreText}>Restore Purchases</Text>
          </TouchableOpacity>

          <Text style={styles.disclaimer}>
            By subscribing, you agree to our Terms of Service and Privacy Policy.
            Subscription automatically renews unless cancelled at least 24 hours before
            the end of the current period.
          </Text>

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
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'flex-end',
  },
  closeButton: {
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
  content: {
    paddingHorizontal: 20,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: neumorphicColors.text.primary,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: neumorphicColors.text.secondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  featuresCard: {
    marginBottom: 24,
    padding: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  checkIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureText: {
    flex: 1,
    fontSize: 16,
    color: neumorphicColors.text.primary,
    lineHeight: 28,
  },
  pricingCard: {
    marginBottom: 24,
    padding: 24,
  },
  pricingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  pricingTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: neumorphicColors.text.primary,
    marginBottom: 4,
  },
  pricingSavings: {
    fontSize: 14,
    fontWeight: '600',
    color: neumorphicColors.success,
  },
  pricingAmount: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 32,
    fontWeight: '700',
    color: neumorphicColors.accent.primary,
  },
  pricePeriod: {
    fontSize: 14,
    color: neumorphicColors.text.tertiary,
  },
  pricingDivider: {
    height: 1,
    backgroundColor: 'rgba(163, 177, 198, 0.2)',
    marginBottom: 16,
  },
  pricingDetails: {
    gap: 8,
  },
  pricingDetail: {
    fontSize: 14,
    color: neumorphicColors.text.secondary,
  },
  upgradeButton: {
    width: '100%',
    marginBottom: 16,
  },
  restoreButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  restoreText: {
    fontSize: 15,
    fontWeight: '600',
    color: neumorphicColors.accent.primary,
  },
  disclaimer: {
    fontSize: 12,
    lineHeight: 18,
    color: neumorphicColors.text.tertiary,
    textAlign: 'center',
    marginTop: 16,
  },
});
