import React from 'react';
import './App.scss';
import logo from './images/logo.svg';
import docIcon from './images/docicon.svg';
import uploadfiles from './images/uploadfiles.svg';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { Container, Row, Col } from 'react-bootstrap'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      numPages: 0,
      pageNumber: 1,
      documents: []
    }
  }

  onFileChange = (event) => {
    let file = event.target.files[0];
    console.log(file)
    let _documents = this.state.documents;
    _documents.push(file);
    this.setState({
      file: file,
      documents: _documents
    });
  }

  openCurrentDocument = (doc) => {
    this.setState({ file: doc })
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  nextPage = () => {
    const currentPageNumber = this.state.pageNumber;
    let nextPageNumber;

    if (currentPageNumber + 1 > this.state.numPages) {
      nextPageNumber = 1;
    } else {
      nextPageNumber = currentPageNumber + 1;
    }
    this.setState({
      pageNumber: nextPageNumber
    });
  }

  render() {

    let documents = this.state.documents;

    return <React.Fragment >
      <Row>
        <Col sm={3} className="left-container">
          <div className="left-inner-container">
            <div className="logo-container"> <img src={logo} className="logo" /></div>
            <div className="header" >Files</div>
            <div className="scrollable-list">
              {documents && documents.length > 0 && documents.map((doc, index) => {
                return <div className="list" onClick={() => this.openCurrentDocument(doc)}>
                  <Row>
                    <Col sm={2}> <img src={docIcon} /></Col>
                    <Col sm={10}><div className="list-label">
                      <span className="list-text" >{doc.name}</span><br />
                    </div></Col>
                  </Row>
                </div>
              })}
            </div>
            <label for="file-upload" className="file-uploader">
              <img src={uploadfiles} /> Upload Files
            </label>
            <input id="file-upload" type="file" onChange={this.onFileChange} hidden />
          </div>
        </Col>
        <Col sm={9}>
          <Container className="right-container">
            <div className="right-inner-container">
              <img src={docIcon} className="doc2-icon" /> {this.state.file ? this.state.file.name : "No file found"}</div>
            <Document file={this.state.file}
              onLoadSuccess={this.onDocumentLoadSuccess}
              onLoadError={(err) => console.warn(err)}
              noData={<h4>Please select a file</h4>}>
              <Page pageNumber={this.state.pageNumber} />
            </Document>
            <div className="cp" onClick={this.nextPage}>
              {this.state.file ? <p>Page {this.state.pageNumber} of {this.state.numPages} (Click to Prev or Next)</p> : null}
            </div>
          </Container>
        </Col>
      </Row>
    </React.Fragment>
  }
}

export default App;
