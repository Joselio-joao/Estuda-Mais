import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import { Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HapticTab } from "@/components/haptic-tab";

type TabIconProps = { color: string; focused: boolean };

function createTabIcon(name: keyof typeof MaterialIcons.glyphMap) {
  return function TabIcon({ color, focused }: TabIconProps) {
    return (
      <MaterialIcons
        name={name}
        size={24}
        color={focused ? "#0D47A1" : color}
      />
    );
  };
}

function CreateTabIcon() {
  return (
    <View style={styles.create}>
      <MaterialIcons name="add" size={29} color="#FFFFFF" />
    </View>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const bottom = Platform.OS === "web" ? 10 : Math.max(insets.bottom, 8);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0D47A1",
        tabBarInactiveTintColor: "#64748B",
        tabBarButton: HapticTab,
        tabBarLabelStyle: styles.label,
        tabBarStyle: {
          height: 62 + bottom,
          paddingTop: 8,
          paddingBottom: bottom,
          backgroundColor: "#FFFFFF",
          borderTopColor: "#D8E1F0",
          borderTopWidth: 1,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Início", tabBarIcon: createTabIcon("home-filled") }}
      />
      <Tabs.Screen
        name="communities"
        options={{ title: "Comunidades", tabBarIcon: createTabIcon("groups") }}
      />
      <Tabs.Screen
        name="create"
        options={{ title: "Criar", tabBarIcon: CreateTabIcon }}
      />
      <Tabs.Screen
        name="learn"
        options={{ title: "Aprender", tabBarIcon: createTabIcon("menu-book") }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: createTabIcon("person-outline"),
        }}
      />
    </Tabs>
  );
}
const styles = StyleSheet.create({
  label: { fontSize: 10, fontWeight: "700", marginTop: 2 },
  create: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginTop: -24,
    backgroundColor: "#0D47A1",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "#F4F7FC",
    elevation: 5,
    shadowColor: "#06265C",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.22,
    shadowRadius: 7,
  },
});
