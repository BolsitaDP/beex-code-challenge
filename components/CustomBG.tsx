import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { IconButton, useTheme } from "react-native-paper";

type CustomBGProps = {
  title?: string;
  titleOnBig?: boolean;
  height?: number;
  keyboardOpen?: boolean;
  children: React.ReactNode;
  backButtonActive?: boolean;
  backButton?: () => void;
};

const CustomBG = ({
  title,
  children,
  height = 80,
  keyboardOpen,
  titleOnBig,
  backButtonActive = false,
  backButton,
}: CustomBGProps) => {
  const theme = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={[styles.background, { backgroundColor: theme.colors.primary }]}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "flex-end",
        }}>
        {/* Header */}
        <View
          style={[
            styles.header,
            {
              backgroundColor: theme.colors.primary,
              height,
            },
          ]}>
          {backButtonActive && (
            <IconButton
              icon="chevron-left"
              iconColor={theme.colors.background}
              size={50}
              style={styles.backButton}
              onPress={() => backButton?.()}
            />
          )}

          <View style={styles.titleWrapper}>
            <Text
              style={[
                styles.title,
                {
                  fontSize: titleOnBig ? 50 : 24,
                  marginTop: keyboardOpen ? 40 : titleOnBig ? 60 : 30,
                  color: theme.colors.background,
                },
              ]}>
              {title}
            </Text>
          </View>
        </View>

        {/* Content */}
        <View
          style={[
            styles.container,
            {
              paddingTop: keyboardOpen ? 110 : 0,
              backgroundColor: theme.colors.background,
              flex: 1,
            },
          ]}>
          {children}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  header: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 0,
  },
  titleWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  title: {
    textAlign: "center",
  },
  container: {
    padding: 20,
    width: "100%",
    borderTopLeftRadius: 100,
    justifyContent: "center",
  },
});

export default CustomBG;
