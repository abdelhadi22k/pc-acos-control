import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Footer = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [open1, setOpen1] = useState(false);

  const handleClickOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };

  const [open2, setOpen2] = useState(false);

  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const [open3, setOpen3] = useState(false);

  const handleClickOpen3 = () => {
    setOpen3(true);
  };
  const handleClose3 = () => {
    setOpen3(false);
  };

  return (
    <footer>
      <Container>
        <div className="New_Stuff">
          <h1>Ready To Get Our New Stuff?</h1>
        </div>
      </Container>

      <Container>
        <Row className="footer">
          <Col md={2}>
            <h3>Support</h3>
            <ul>
              <li> acos.pc@gmail.com</li>
              <li>+213 (123 456 789)</li>

              <li>
                <React.Fragment>
                  <p variant="outlined" onClick={handleClickOpen2}>
                    About us
                  </p>
                  <BootstrapDialog
                    onClose={handleClose2}
                    aria-labelledby="customized-dialog-title"
                    open={open2}
                  >
                    <DialogTitle
                      sx={{ m: 0, p: 2 }}
                      id="customized-dialog-title"
                    >
                      About us
                    </DialogTitle>
                    <IconButton
                      aria-label="close"
                      onClick={handleClose2}
                      sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
                      <Typography gutterBottom>
                        Acos store is a store specialized in selling computer
                        parts and assemblies in Algeria. The store provides a
                        wide range of original and guaranteed parts from the
                        best international brands, in addition to custom
                        assemblies that suit the needs of different users,
                        whether for gaming, design, or office work. Acos Store
                        aims to provide customers with an outstanding purchasing
                        experience by providing high-quality products and
                        excellent customer service.
                      </Typography>
                    </DialogContent>
                  </BootstrapDialog>
                </React.Fragment>
              </li>

              <li>
                <React.Fragment>
                  <p variant="outlined" onClick={handleClickOpen3}>
                    FQA'S
                  </p>
                  <BootstrapDialog
                    onClose={handleClose3}
                    aria-labelledby="customized-dialog-title"
                    open={open3}
                  >
                    <DialogTitle
                      sx={{ m: 0, p: 2 }}
                      id="customized-dialog-title"
                    >
                      FQA'S
                    </DialogTitle>
                    <IconButton
                      aria-label="close"
                      onClick={handleClose3}
                      sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
                      <Typography gutterBottom>
                        <h5>What products does Acos store offer?</h5>
                        Acos store specializes in selling personal computer (PC) parts and assemblies only. We offer a variety of computer parts such as processors, graphics cards, motherboards, and RAM, as well as custom assemblies.
                      </Typography>

                      <Typography gutterBottom>
                        <h5>Are all the products available original?</h5>
                        Yes, all the products we sell are original and guaranteed from the best international brands.
                      </Typography>

                      
                      <Typography gutterBottom>
                        <h5>Can I customize a computer assembly to my needs?</h5>
                        naturally! We offer a custom computer assembly service based on your specific requirements and needs, whether you need it for gaming, design, or office work.
                      </Typography>

                      <Typography gutterBottom>
                        <h5>Do you provide shipping service within Algeria?</h5>
                        Yes, we provide shipping service to all states of Algeria, ensuring that the products arrive in their best condition.
                      </Typography>


                      <Typography gutterBottom>
                        <h5>How long does it take to process my order?</h5>
                        Order processing time varies depending on the availability of the required parts and the type of assembly. Typically, the assembly process takes 3 to 5 business days.
                      </Typography>

                      
                      <Typography gutterBottom>
                        <h5>What payment methods are available?</h5>
                        We provide payment service upon receipt,
                      </Typography>

                      
                      <Typography gutterBottom>
                        <h5>Can I return or exchange a product?</h5>
                        Yes, you can return or exchange the product within a specified period provided that it is in its original condition and unused. Terms and conditions apply.
                      </Typography>

                      
                      <Typography gutterBottom>
                        <h5>How can I contact customer service?</h5>
                        You can contact us by phone, email, or through our social media pages. We are here to help you with any inquiries.
                      </Typography>

                      
                      <Typography gutterBottom>
                        <h5>Do you offer offers and discounts?</h5>
                        Yes, we offer periodic offers and discounts on a range of products. You can follow our website and social media pages to stay updated with the latest offers.
                      </Typography>

                      

                    </DialogContent>
                  </BootstrapDialog>
                </React.Fragment>
              </li>
            </ul>
          </Col>

          <Col md={2}>
            <h3>Navigation</h3>
            <ul>
              <li>
                <Link to="/"> Home page </Link>{" "}
              </li>
              <li>
                <Link to="/Product"> Products</Link>{" "}
              </li>
              <li>
                {" "}
                <Link to="/Favorite"> Favorite</Link>{" "}
              </li>
              <li>
                {" "}
                <Link to="/cart"> Cart</Link>{" "}
              </li>
            </ul>
          </Col>

          <Col md={2}>
            <h3>Contact Us</h3>
            <ul>
              <li> +213 (123 456 789)</li>
              <li> acos.pc@gmail.com</li>
              <li> Location Algeria  (UTC+01:00) </li>
            </ul>
          </Col>

          <Col className="social_media_link_col" md={6}>
            <h3>Social media links</h3>
            <ul className="social_media_link">
              <li>
                {" "}
                <a target="blank" href="#ff">
                  {" "}
                  <InstagramIcon sx={{ fontSize: 16 }} />{" "}
                </a>{" "}
              </li>
              <li>
                {" "}
                <a target="blank" href="#ff">
                  {" "}
                  <FacebookIcon sx={{ fontSize: 16 }} />{" "}
                </a>{" "}
              </li>
              <li>
                {" "}
                <a target="blank" href="#ff">
                  {" "}
                  <LinkedInIcon sx={{ fontSize: 16 }} />{" "}
                </a>{" "}
              </li>
              <li>
                {" "}
                <a target="blank" href="#ff">
                  {" "}
                  <XIcon sx={{ fontSize: 16 }} />{" "}
                </a>{" "}
              </li>
            </ul>
          </Col>
        </Row>
      </Container>

      <Container>
        <div className="footer_line"></div>
      </Container>

      <Container>
        <Row className="footer_Policy">
          <Col md={8}>
            <p>© 2024 acos ( abdelhadi kaba ) All rights reserved</p>
          </Col>

          <Col md={2}>
            <React.Fragment>
              <p onClick={handleClickOpen}>Terms and Conditions</p>
              <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
              >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                  Terms and Conditions
                </DialogTitle>
                <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                  <Typography gutterBottom>
                    These Terms of Use and all additional policies and terms (if
                    applicable) on the Site set forth the terms we provide to
                    you for accessing and using the Site and Services
                    (collectively, the “Services”). You can find out all
                    additional policies and terms here www.acos-pc.com Upon your
                    access, registration and/or continued use or access of the
                    Services, you agree to be bound by these Terms of Use and
                    the Legal Documents with immediate effect. These terms of
                    use are subject to modification by us at any time. Your
                    continued use of the Site following the posting of any
                    change will mean your acceptance of these Terms of Use and
                    the modified legal documents.
                  </Typography>
                </DialogContent>
              </BootstrapDialog>
            </React.Fragment>
          </Col>

          <Col md={2}>
            <React.Fragment>
              <p variant="outlined" onClick={handleClickOpen1}>
                Privacy Policy
              </p>
              <BootstrapDialog
                onClose={handleClose1}
                aria-labelledby="customized-dialog-title"
                open={open1}
              >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                  Privacy Policy
                </DialogTitle>
                <IconButton
                  aria-label="close"
                  onClick={handleClose1}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                  <Typography gutterBottom>
                    This Privacy Policy sets out the basis on which we will
                    treat any personal and other data we collect from you or
                    from other sources or that you provide to us (“Data”) in
                    connection with your access to and use of www.acos-pc.com.
                    Services and applications (collectively referred to as the
                    “Services”). We understand the importance of this data, and
                    we are committed to protecting and respecting your privacy.
                    Please read the following carefully to understand our data
                    practices. By using our services you agree to the handling
                    of data in accordance with this privacy policy. References
                    to the first person pronoun (or similar) in this Privacy
                    Policy are references to acos Store and references to “you”
                    or “the user” are references to you as an individual or
                    legal person, as the case may be.
                  </Typography>
                </DialogContent>
                <DialogActions></DialogActions>
              </BootstrapDialog>
            </React.Fragment>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
