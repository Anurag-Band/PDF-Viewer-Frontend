// import { loadUser } from "../features/auth/authSlice";
import {
  clearErrors,
  getAllPdfs,
  uploadPdf,
} from "../features/pdfUpload/pdfUploadSlice";
import { UploadFile } from "@mui/icons-material";
import { Box, Button, Container, CssBaseline, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PdfCard from "../components/PdfCard";
import { unwrapResult } from "@reduxjs/toolkit";
import Loader from "../assets/loading.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const filePickerRef = useRef(null);
  const [selectedPDF, setSelectedPDF] = useState(null);

  const dispatch = useDispatch();
  const { status, isAuthenticated, errorMessage, user } = useSelector(
    (state) => state.auth
  );
  const { isUploading, uploadError, allPdfs, allPdfError } = useSelector(
    (state) => state.pdfUpload
  );

  useEffect(() => {
    if (status != "ERROR") {
      setTimeout(() => {
        dispatch(clearErrors());
      }, 2000);
    }
  }, [status, dispatch, errorMessage]);

  useEffect(() => {
    dispatch(getAllPdfs());
  }, [dispatch]);

  const handlePdfUpload = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedPDF(file);
      let formData = new FormData();
      formData.append("file", file);

      dispatch(uploadPdf(formData))
        .then(unwrapResult)
        .then(() => dispatch(getAllPdfs()))
        .catch((err) => {
          toast.error(err, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });

      setSelectedPDF(null);
    }
  };

  return (
    <Container
      component='main'
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <CssBaseline />
      <Box
        component='main'
        maxWidth='xs'
        sx={{
          marginTop: 8,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          marginBottom: 10,
        }}
      >
        {/* Upload Button Section */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            // disabled={selectedPDF}
            onClick={() => filePickerRef.current.click()}
            variant='outlined'
            sx={{
              width: 220,
            }}
          >
            <UploadFile sx={{ mr: 2 }} />
            <Typography
              variant='h6'
              color='inherit'
              noWrap
              fontSize={20}
              fontWeight={400}
            >
              Upload PDF
              <input
                type='file'
                name='file'
                ref={filePickerRef}
                accept='application/pdf'
                hidden
                onChange={handlePdfUpload}
              />
            </Typography>
          </Button>
        </Box>
        {/* PDF List Section */}
        <Box
          sx={{
            width: "100%",
            height: "100%",
            marginTop: 10,
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          {status === "LOADING" && <img src={Loader} alt='Loading...' />}
          {allPdfs?.map((file) => (
            <PdfCard key={file.id} file={file} />
          ))}
        </Box>
      </Box>
    </Container>
  );
}
