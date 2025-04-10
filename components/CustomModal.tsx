import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import { Modal, Text, Button, useTheme, Portal } from "react-native-paper";

interface ModalAction {
  label: string;
  onPress: () => void;
  mode?: "text" | "outlined" | "contained";
}

interface CustomModalProps {
  visible: boolean;
  onDismiss: () => void;
  title?: string;
  children?: ReactNode;
  actions?: ModalAction[];
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onDismiss,
  title,
  children,
  actions = [],
}) => {
  const theme = useTheme();

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[
          styles.modalContainer,
          { backgroundColor: theme.colors.background },
        ]}>
        {title && (
          <Text style={[styles.title, { color: theme.colors.primary }]}>
            {title}
          </Text>
        )}

        <View style={styles.content}>{children}</View>

        {actions.length > 0 && (
          <View style={styles.actionsContainer}>
            {actions.map((action, index) => (
              <Button
                key={index}
                mode={action.mode || "text"}
                onPress={action.onPress}>
                {action.label}
              </Button>
            ))}
          </View>
        )}
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 20,
    elevation: 5,
    zIndex: 100,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  content: {
    marginBottom: 15,
    zIndex: 100,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 5,
  },
});

export default CustomModal;
