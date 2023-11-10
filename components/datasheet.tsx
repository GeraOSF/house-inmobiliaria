import { Property } from "@prisma/client";
import {
  Document,
  StyleSheet,
  Page,
  View,
  Text,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export default function Datasheet({ property }: { property: Property }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text>{property.address}</Text>
      </Page>
    </Document>
  );
}
