import React from 'react';
import { Line, Bar, Radar, Pie } from 'react-chartjs-2';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, ArcElement, BarElement, RadialLinearScale, CategoryScale, LinearScale } from 'chart.js';

// Register the required components
ChartJS.register(
  Title, Tooltip, Legend,
  LineElement, PointElement, ArcElement, BarElement,
  RadialLinearScale, CategoryScale, LinearScale
);

const ChartComponent = ({ data }) => {
  // Data for charts
  const acWashingMachineData = {
    labels: ['AC Service', 'Washing Machine Service'],
    datasets: [{
      label: 'Service Types',
      data: [data.acService, data.washingMachineService],
      backgroundColor: ['#FF6384', '#36A2EB'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB'],
    }]
  };

  const earnings = 50000;

  const timeCommitmentData = {
    labels: ['Time Commitment'],
    datasets: [{
      label: 'Hours',
      data: [data.timeCommitment],
      backgroundColor: '#FFCE56',
      hoverBackgroundColor: ['#FFCE56']
    }]
  };

  const workCompletionRateData = {
    labels: ['Work Completion Rate'],
    datasets: [{
      label: 'Completion Rate',
      data: [data.workCompletionRate],
      backgroundColor: '#FF9F40',
    }]
  };

  const customerRatingData = {
    labels: ['Customer Rating'],
    datasets: [{
      label: 'Rating',
      data: [data.customerRating],
      backgroundColor: '#4BC0C0',
    }]
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="text-center shadow-lg border-0">
            <Card.Body>
              <Card.Title className="display-4 mb-3">
                ${earnings.toLocaleString()}
              </Card.Title>
              <Card.Text className="lead text-muted">
                Total Earnings
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="my-4 justify-content-center">
        <Col md={4} className="d-flex justify-content-center mb-4">
          <div className="w-100">
            <h5 className="text-center mb-3">AC and Washing Machine Service</h5>
            <Pie data={acWashingMachineData} />
          </div>
        </Col>

        <Col md={4} className="d-flex justify-content-center mb-4">
          <div className="w-100">
            <h5 className="text-center mb-3">Time Commitment</h5>
            <Bar data={timeCommitmentData} />
          </div>
        </Col>
      </Row>
      <Row className="my-4 justify-content-center">
        <Col md={4} className="d-flex justify-content-center mb-4">
          <div className="w-100">
            <h5 className="text-center mb-3">Work Completion Rate</h5>
            <Line data={workCompletionRateData} />
          </div>
        </Col>
        <Col md={4} className="d-flex justify-content-center mb-4">
          <div className="w-100">
            <h5 className="text-center mb-3">Customer Rating</h5>
            <Radar data={customerRatingData} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ChartComponent;