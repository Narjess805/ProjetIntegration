import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  ScrollView,
  StatusBar, 
  SafeAreaView, 
  ActivityIndicator,
  RefreshControl,
  TextInput,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, RefreshCw, GraduationCap, Users, Plus } from 'lucide-react-native';
import StudentCard from './components/StudentCard';

const { width, height } = Dimensions.get('window');

// Base URL de l'API Gateway (toutes les requêtes passent par ici)
// Remplacez par l'adresse de votre API Gateway si différente
const API_GATEWAY = 'http://localhost:8080';
const DEPTS_URL = `${API_GATEWAY}/api/departements`;
const ETUDIANTS_URL = `${API_GATEWAY}/api/etudiants`;

export default function App() {
  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDeptId, setSelectedDeptId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(ETUDIANTS_URL);
      setStudents(response.data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Impossible de se connecter au serveur. Vérifiez l\'adresse IP.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const resp = await axios.get(DEPTS_URL);
      setDepartments(resp.data || []);
    } catch (err) {
      console.error('Fetch departments error:', err);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchStudents();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchStudents();
  };

  const deptFiltered = selectedDeptId ? students.filter(s => s.departementId === selectedDeptId) : students;

  const filteredStudents = deptFiltered.filter(s => 
    s.nom.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (s.cin && s.cin.includes(searchQuery))
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.topRow}>
        <View style={styles.titleGroup}>
          <Text style={styles.welcomeText}>Bienvenue,</Text>
          <Text style={styles.title}>Nexus Portal</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <LinearGradient
            colors={['#818CF8', '#C084FC']}
            style={styles.profileGradient}
          >
            <Users color="#FFF" size={20} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{students.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={[styles.statItem, styles.statBorder]}>
          <Text style={styles.statValue}>{filteredStudents.length}</Text>
          <Text style={styles.statLabel}>Filtrés</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>V1.0</Text>
          <Text style={styles.statLabel}>Version</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search color="#94A3B8" size={20} />
          <TextInput 
            style={styles.searchInput}
            placeholder="Rechercher un étudiant..."
            placeholderTextColor="#64748B"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Plus color="#FFF" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.deptScroll} contentContainerStyle={{paddingVertical: 12}}>
        <TouchableOpacity onPress={() => setSelectedDeptId(null)} style={[styles.deptChip, selectedDeptId === null && styles.deptChipActive]}>
          <Text style={[styles.deptChipText, selectedDeptId === null && styles.deptChipTextActive]}>Tous</Text>
        </TouchableOpacity>
        {departments.map(d => (
          <TouchableOpacity key={d.id} onPress={() => setSelectedDeptId(d.id)} style={[styles.deptChip, selectedDeptId === d.id && styles.deptChipActive]}>
            <Text style={[styles.deptChipText, selectedDeptId === d.id && styles.deptChipTextActive]}>{d.nom}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyState}>
      {loading ? (
        <ActivityIndicator size="large" color="#818CF8" />
      ) : (
        <>
          <View style={styles.errorIconContainer}>
            <RefreshCw color="#6366F1" size={40} />
          </View>
          <Text style={styles.emptyText}>
            {error ? error : "Aucun étudiant n'a été trouvé dans la base de données."}
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchStudents}>
            <LinearGradient
              colors={['#4F46E5', '#7C3AED']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.retryGradient}
            >
              <Text style={styles.retryButtonText}>Actualiser</Text>
            </LinearGradient>
          </TouchableOpacity>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Abstract Background Shapes */}
      <View style={styles.blob1} />
      <View style={styles.blob2} />
      
      <SafeAreaView style={styles.safeArea}>
        <FlatList
          data={filteredStudents}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <StudentCard student={item} />}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={renderHeader()}
          stickyHeaderIndices={[0]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh} 
              tintColor="#FFF" 
            />
          }
          ListEmptyComponent={renderEmpty}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  blob1: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(79, 70, 229, 0.15)',
  },
  blob2: {
    position: 'absolute',
    bottom: -50,
    left: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  titleGroup: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: '#94A3B8',
    fontWeight: '500',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#F8FAFC',
    letterSpacing: -0.5,
  },
  profileButton: {
    width: 45,
    height: 45,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#818CF8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  profileGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  deptScroll: {
    marginTop: 12,
    paddingHorizontal: 20,
  },
  deptChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 999,
    marginRight: 10,
  },
  deptChipActive: {
    backgroundColor: '#4F46E5',
  },
  deptChipText: {
    color: '#94A3B8',
    fontWeight: '600',
  },
  deptChipTextActive: {
    color: '#FFF',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: '#F8FAFC',
  },
  filterButton: {
    width: 50,
    height: 50,
    backgroundColor: '#4F46E5',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  listContent: {
    paddingBottom: 40,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
    paddingHorizontal: 40,
  },
  errorIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  retryButton: {
    width: '80%',
    height: 55,
    borderRadius: 18,
    overflow: 'hidden',
  },
  retryGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  retryButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});