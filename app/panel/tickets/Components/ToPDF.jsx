import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#f9fafb'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12
  },
  taskName: {
    fontWeight: 'bold',
    fontSize: '20px',
  },
  paragraph: {
    fontSize: 12,
    textAlign: 'left'
  },
  separator: {
    borderBottom: 1,
    borderColor: 'black',
    marginBottom: 10,
    marginTop: 10
  },
  task: {
    marginBottom: 7,
    display: 'flex',
    flexDirection: 'column',
    border: '2px solid #f5f5f5',
    borderRadius: '4px',
    marginBottom: '16px',
    justifyContent: 'space-between',
    backgroundColor: "#fff",
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 3px 1px rgba(0, 0, 0, 0.1)',
  },
  taskHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#ccfbf1', 
    padding: '8px',
  },
  taskBody: {
    marginBottom: '16px',  
    sm: { marginBottom: 0 },  
    padding: '8px', 
    width: '100%',
  },
  taskDescription: {
    fontSize: '15px',
    color: '#718096',
    marginBottom: '16px',
  },
  taskLabel: {
    color: '#4a5568',
    textTransform: 'uppercase', 
    fontWeight: 'bold', 
    fontSize: '15px'
  },
  state: {
    marginTop: "4px",
    padding: "5px",
    border: '2px solid #f5f5f5',
  }
});

const MyDocument = ({currentTicket, tasks}) => {

  return (

    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>{currentTicket.problemType}</Text>
          <Text style={styles.paragraph}>
            {currentTicket.description}
          </Text>
          <View style={styles.separator} />
          {
            tasks.length !== 0 && (
              <>
                <Text style={styles.title}>Tareas</Text>
                {
                  tasks.map(task => (
                    <View key={task._id} style={styles.task}>
                      <View style={styles.taskHeader}>
                        <Text style={styles.taskName}>{task.name}</Text>
                      </View>

                      <View style={styles.taskBody}>
                        <Text style={styles.taskDescription}>{`${task.description }`}</Text>

                        <View>
                          <Text style={styles.taskLabel}>Estado</Text>
                          
                          <View style={styles.state}>
                            <Text>{task.state}</Text>
                          </View>
                        </View>
                      </View>

                    </View>
                  ))
                }
              </>
            )
          }
        </View>
      </Page>
    </Document>
  )
};

export default MyDocument;
