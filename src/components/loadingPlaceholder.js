import React from "react";
import { motion } from "framer-motion";
import Container from "../styledComponents/container";
import styled from "styled-components";

const LoadingPlaceHolder = (props) => {
    return (<Container as={motion.div} space
        animate={{ backgroundColor: ['hsl(220,18,93)', 'hsl(120,74,75)', 'hsl(220,18,93)'] }}
        transition={{
            duration: 2,
            repeat: 10,
            repeatType: 'loop',
        }}>
    </Container>)
}


export default LoadingPlaceHolder
