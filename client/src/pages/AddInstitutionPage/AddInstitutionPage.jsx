import React from "react";
import { Link, Redirect } from "react-router-dom";
import PageTemplate from "../../templates/PageTemplate/PageTemplate";
import FormTemplate from "../../templates/FormTemplate/FormTemplate";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { RegionDropdown } from "react-country-region-selector";

class AddInstitutionPage extends React.Component {
  state = {
    name: "",
    address: "",
    city: "",
    cities: [],
    state: "",
    telephone: "",
    websiteURL: "",
    redirect: false,
    validated: false,
    redirectId: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  selectstateCode = e => {
    this.setState({ state: e });
  };

  addCity = e => {
    this.setState(({ cities }) => {
      this.setState(cities.push(e.target.value));
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    this.setState({ validated: true });

    if (form.checkValidity() === false) {
      return;
    }

    fetch("/api/institutions", {
      method: "POST",
      body: JSON.stringify({
        name: this.state.name,
        address: this.state.address,
        cities: this.state.cities,
        telephone: this.state.telephone,
        website: this.state.websiteURL,
        skip: 0
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => {
        this.setState({
          redirect: true,
          redirectId: response.institutionId
        });
      });
  };

  render() {
    if (this.state.redirect)
      return <Redirect to={`/institutions/${this.state.redirectId}`} />;

    const { validated } = this.state.validated;

    return (
      <PageTemplate>
        <h1>Add New Institution to EDUreview</h1>
        <Link to="/institutions">Browse all institutions</Link>
        <FormTemplate>
          <Form
            noValidate
            validated={validated}
            onSubmit={e => this.handleSubmit(e)}
          >
            <Form.Group as={Form.Row} controlId="formGroupName">
              <Form.Label>Institution Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Institution Name"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group as={Form.Row} controlId="formGroupAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Address"
                name="address"
                value={this.state.address}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Row>
              <Col>
                <Form.Group controlId="formGroupCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter City"
                    name="cities"
                    value={this.state.cities}
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formGroupState">
                  <Form.Label>State</Form.Label>
                  <Col sm="9">
                    <RegionDropdown
                      country={"United States"}
                      value={this.state.state}
                      name="state"
                      onChange={this.selectstateCode}
                      valueType="short"
                    />
                  </Col>
                  <Form.Control
                    className="d-none"
                    isInvalid={!this.state.state}
                  />
                  <Form.Control.Feedback type="invalid">
                    Required Field
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Form.Row>

            <Form.Group as={Form.Row} controlId="formGroupWebsite">
              <Form.Label>Website</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="https://example.com"
                name="websiteURL"
                value={this.state.websiteURL}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
        </FormTemplate>
      </PageTemplate>
    );
  }
}

export default AddInstitutionPage;
