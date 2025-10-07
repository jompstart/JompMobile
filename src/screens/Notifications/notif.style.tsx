import { StyleSheet } from "react-native";
import { size } from "../../config/size";
import { colors } from "../../constants/colors";

export const notificationStyles = StyleSheet.create({
  view: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: size.getWidthSize(16),
    gap: size.getWidthSize(16),
    justifyContent: "space-between",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  backText: {
    marginLeft: size.getWidthSize(4),
  },
  headerTitle: {
    flex: 2,
    textAlign: "center",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: size.getWidthSize(16),
    flex: 1,
    justifyContent: "flex-end",
  },
  headerButton: {
    padding: size.getWidthSize(4),
  },
  detailHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: size.getWidthSize(16),
    paddingVertical: size.getHeightSize(16),
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  detailBackButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailContent: {
    flex: 1,
    paddingHorizontal: size.getWidthSize(16),
    paddingTop: size.getHeightSize(24),
  },
  amountCard: {
    backgroundColor: colors.white("70"),
    borderRadius: size.getWidthSize(12),
    padding: size.getWidthSize(20),
    marginTop: size.getHeightSize(24),
    borderLeftWidth: 4,
    borderLeftColor: "#FF9800",
  },
  amount: {
    textAlign: "center",
    marginBottom: size.getHeightSize(16),
  },
  cardInfo: {
    gap: size.getHeightSize(12),
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  additionalInfo: {
    marginTop: size.getHeightSize(32),
    padding: size.getWidthSize(16),
    backgroundColor: "#f8f9fa",
    borderRadius: size.getWidthSize(8),
  },
  infoTitle: {
    marginBottom: size.getHeightSize(8),
  },
  content: {
    flex: 1,
    marginTop: size.getHeightSize(16),
  },
  titleSection: {
    padding: size.getWidthSize(16),
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  notificationItem: {
    backgroundColor: "white",
    marginHorizontal: size.getWidthSize(16),
    marginBottom: size.getHeightSize(12),
    borderRadius: size.getWidthSize(12),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: size.getHeightSize(16),
    paddingHorizontal: size.getWidthSize(16),
  },
  iconContainer: {
    width: size.getWidthSize(32),
    height: size.getWidthSize(32),
    borderRadius: size.getWidthSize(8),
    justifyContent: "center",
    alignItems: "center",
    marginRight: size.getWidthSize(12),
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  notificationTitle: {
    lineHeight: 20,
    marginBottom: size.getHeightSize(2),
  },
  notificationTime: {
    lineHeight: 16,
  },
  rightSection: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  redDot: {
    width: size.getWidthSize(6),
    height: size.getWidthSize(6),
    borderRadius: size.getWidthSize(3),
    backgroundColor: "#FF3B30",
    position: "absolute",
    top: -2,
    right: size.getWidthSize(4),
    zIndex: 1,
  },
  viewButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: size.getHeightSize(6),
    paddingHorizontal: size.getWidthSize(8),
  },
  viewText: {
    marginRight: size.getWidthSize(4),
  },
  notificationsList: {
    flex: 1,
    paddingTop: size.getHeightSize(8),
  },
  errorContainer: {
    padding: size.getWidthSize(16),
    backgroundColor: "#ffebee",
    marginHorizontal: size.getWidthSize(16),
    marginTop: size.getHeightSize(8),
    borderRadius: size.getWidthSize(8),
  },
  clearAllButton: {
    padding: size.getWidthSize(16),
    alignItems: "center",
    marginVertical: size.getHeightSize(16),
  },
  noNotificationsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: size.getHeightSize(32),
  },
  noNotificationsText: {
    marginTop: size.getHeightSize(16),
    textAlign: "center",
  },
});
