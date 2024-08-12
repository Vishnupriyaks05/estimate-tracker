import React, { useState } from "react";
import { Form, Button, Table, Container, Row, Col, Modal } from "react-bootstrap";
import { searchData } from "../services/estimateService";

function SearchForm() {
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showNoDataModal, setShowNoDataModal] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    console.log("Search input changed:", value); // Log the input value
    setSearchKey(value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    // console.log("Search form submitted with keyword:", searchKey);

    try {
        // Call the searchData function
        const response = await searchData(searchKey);
        console.log('Search results received:', response);

        // Extract the array from response.data
        const results = response.data;

        // Check if results is an array and update the state
        if (Array.isArray(results) && results.length > 0) {
            setSearchResults(results);   // Update the state with the results
            setShowNoDataModal(false);
        } else {
            console.error('Unexpected search results format:', results);
            setSearchResults([]); // Clear the results if the format is incorrect
            setShowNoDataModal(true); // Show the modal if no data is found
        }
    } catch (error) {
        console.error('Error fetching search results:', error);
    }
  };

  const handleClose = () => setShowNoDataModal(false);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="mt-4">Search Estimates</h2>
          <Form onSubmit={handleSearch}>
            <Form.Group as={Row} controlId="formSearchKey" className="mb-3">
              <Form.Label column sm={4}>
                Search by Keyword
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  value={searchKey}
                  onChange={handleChange}
                  placeholder="Search by name, platform, technology, estimate name, summary, or other tools/libraries"
                  required
                />
              </Col>
            </Form.Group>
            <Row className="justify-content-md-center">
              <Col sm={12} className="text-center">
                <Button variant="primary" type="submit">
                  Search
                </Button>
              </Col>
            </Row>
          </Form>

          {searchResults.length > 0 && (
            <Table striped bordered hover className="mt-4">
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Estimate Name</th>
                    <th>Estimate Date</th>
                    <th>Platform</th>
                    <th>Technology</th>
                    <th>Summary</th>
                    <th>Other Tools</th>
                </tr>
            </thead>
            <tbody>
                {searchResults.map((result, index) => (
                    <tr key={index}>
                        <td>{result.employee_id}</td>
                        <td>{result.name}</td>
                        <td>{result.name_of_estimate}</td>
                        <td>{new Date(result.date_of_estimate).toLocaleDateString()}</td>
                        <td>{result.platform}</td>
                        <td>{Array.isArray(result.technology) ? result.technology.join(', ') : result.technology}</td>
                        <td>{result.summury || 'No summary available'}</td>
                        <td>{result.others || 'No tools listed'}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
          )}

          {/* No Data Modal */}
          <Modal show={showNoDataModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>No Data Found</Modal.Title>
            </Modal.Header>
            <Modal.Body>No results were found for your search. Please try again with a different keyword.</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default SearchForm;
