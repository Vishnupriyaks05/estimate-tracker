import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import PlatformOptions from './inputComponents/PlatformOptions';
import SelectedTechnologyBadge from './inputComponents/SelectedTechnologyBadge';
import technologyOptions from './inputComponents/TechnologyOptions';
import { saveData } from '../services/estimateService';


function EstimateForm() {
    //This state variable stores all the form fields' values 
    const [formData, setFormData] = useState({
        employeeId: '',
        name: '',
        estimateName: '',
        estimateDate: new Date(),
        platform: '',
        technology: [],
        summary: '',
        otherTools: ''
    });

    /**
     *  A generic function that updates the formData state 
     * when a text input or select value changes.
     * @param {*} e 
     */
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    /**
     * updates the technology field in the formData state 
     * when the user selects or deselects technologies
     * @param {*} selectedOptions 
     */
    const handleTechnologyChange = (selectedOptions) => {
        setFormData((prevData) => ({
            ...prevData,
            technology: selectedOptions || []
        }));
    };

    /**
     * updates the estimateDate in the formData state 
     * when the user selects a date.
     * @param {*} date 
     */
    const handleDateChange = (date) => {
        setFormData((prevData) => ({
            ...prevData,
            estimateDate: date,
        }));
    };

    /**
     * Function to submit the form
     * @param {*} e 
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

         // Convert the technology array to an array of strings (or a comma-separated string)
    const technologyStrings = formData.technology.map(tech => tech.label);

        // Prepare the data to send
        const dataToSend = {
            ...formData,
            technology: technologyStrings, // Convert technology objects to strings
            estimateDate: formData.estimateDate.toISOString().slice(0, 10) // Convert date to ISO string
        };

        try {
            const result = await saveData(dataToSend);
            console.log('Success:', result);
            // Optionally clear form or show a success message

            setFormData({
                employeeId: '',
                name: '',
                estimateName: '',
                estimateDate: new Date(),
                platform: '',
                technology: [],
                summary: '',
                otherTools: ''
            });

        } catch (error) {
            console.error('Error submitting data:', error);
            // Optionally show an error message to the user
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2 className="mt-4">Estimate Form</h2>
                    <Form onSubmit={handleSubmit}>
                        {/* Employee ID Field */}
                        <Form.Group as={Row} controlId="formEmployeeId" className="mb-3">
                            <Form.Label column sm={4}>
                                Employee ID
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    type="text"
                                    name="employeeId"
                                    value={formData.employeeId}
                                    onChange={handleChange}
                                    placeholder="Enter Employee ID"
                                    required
                                />
                            </Col>
                        </Form.Group>

                        {/* Name Field */}
                        <Form.Group as={Row} controlId="formName" className="mb-3">
                            <Form.Label column sm={4}>
                                Name
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter Name"
                                    required
                                />
                            </Col>
                        </Form.Group>

                        {/* Estimate Name Field */}
                        <Form.Group as={Row} controlId="formEstimateName" className="mb-3">
                            <Form.Label column sm={4}>
                                Name of Estimate
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    type="text"
                                    name="estimateName"
                                    value={formData.estimateName}
                                    onChange={handleChange}
                                    placeholder="Enter Name of Estimate"
                                    required
                                />
                            </Col>
                        </Form.Group>

                        {/* Estimate Date Field */}
                        <Form.Group as={Row} controlId="formEstimateDate" className="mb-3">
                            <Form.Label column sm={4}>
                                Date of Estimate
                            </Form.Label>
                            <Col sm={8}>
                                <DatePicker
                                    selected={formData.estimateDate}
                                    onChange={handleDateChange}
                                    className="form-control"
                                    dateFormat="yyyy-MM-dd"
                                    required
                                />
                            </Col>
                        </Form.Group>

                        {/* Platform Field */}
                        <Form.Group as={Row} controlId="formPlatform" className="mb-3">
                            <Form.Label column sm={4}>
                                Platform
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Select
                                    name="platform"
                                    value={formData.platform}
                                    onChange={handleChange}
                                    required
                                >
                                    <PlatformOptions />
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        {/* Technology Field */}
                        <Form.Group as={Row} controlId="formTechnology" className="mb-3">
                            <Form.Label column sm={4}>
                                Technology
                            </Form.Label>
                            <Col sm={8}>
                                {/* Display selected technologies as badges */}
                                <div className="mb-2">
                                    {formData.technology.map((tech, index) => (
                                        <SelectedTechnologyBadge
                                            key={index}
                                            technology={tech.label}
                                            onRemove={() => handleTechnologyChange(
                                                formData.technology.filter(t => t.value !== tech.value)
                                            )}
                                        />
                                    ))}
                                </div>
                                <Select
                                    isMulti
                                    name="technology"
                                    options={technologyOptions}
                                    value={formData.technology}
                                    onChange={handleTechnologyChange}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            </Col>
                        </Form.Group>

                        {/* Summary Field */}
                        <Form.Group as={Row} controlId="formSummary" className="mb-3">
                            <Form.Label column sm={4}>
                                Summary
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    as="textarea"
                                    name="summary"
                                    value={formData.summary}
                                    onChange={handleChange}
                                    placeholder="Enter Summary"
                                    maxLength="1000"
                                    rows={4}
                                />
                            </Col>
                        </Form.Group>

                        {/* Other Tools/Libraries Considered Field */}
                        <Form.Group as={Row} controlId="formOtherTools" className="mb-3">
                            <Form.Label column sm={4}>
                                Other Tools/Libraries considered
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    as="textarea"
                                    name="otherTools"
                                    value={formData.otherTools}
                                    onChange={handleChange}
                                    placeholder="Enter Other Tools/Libraries considered"
                                    maxLength="1000"
                                    rows={4}
                                />
                            </Col>
                        </Form.Group>

                        {/* Submit Button */}
                        <Row className="justify-content-md-center">
                            <Col sm={12} className="text-center">
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default EstimateForm;
