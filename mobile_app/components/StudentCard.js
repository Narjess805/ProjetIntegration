import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { User, CreditCard, Calendar, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const StudentCard = ({ student }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.header}>
          <LinearGradient
            colors={['#4F46E5', '#7C3AED']}
            style={styles.iconContainer}
          >
            <User color="#FFF" size={24} />
          </LinearGradient>
          
          <View style={styles.nameContainer}>
            <Text style={styles.nom}>{student.nom}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Étudiant Actif</Text>
            </View>
          </View>

          <ChevronRight color="#475569" size={20} />
        </View>

        <View style={styles.divider} />

        <View style={styles.details}>
          <View style={styles.detailItem}>
            <View style={styles.detailIconWrapper}>
              <CreditCard color="#818CF8" size={16} />
            </View>
            <View>
              <Text style={styles.detailLabel}>CIN / Identifiant</Text>
              <Text style={styles.detailValue}>{student.cin}</Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <View style={styles.detailIconWrapper}>
              <Calendar color="#A78BFA" size={16} />
            </View>
            <View>
              <Text style={styles.detailLabel}>Date de Naissance</Text>
              <Text style={styles.detailValue}>{student.dateNaissance}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 54,
    height: 54,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  nameContainer: {
    flex: 1,
  },
  nom: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  badge: {
    backgroundColor: 'rgba(79, 70, 229, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 10,
    color: '#818CF8',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginVertical: 18,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  detailLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 13,
    color: '#CBD5E1',
    fontWeight: '500',
    marginTop: 1,
  },
});

export default StudentCard;