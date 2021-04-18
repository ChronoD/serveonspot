package com.example.serveonspot.configuration;


import com.example.serveonspot.configuration.exceptions.AppointmentException;
import com.example.serveonspot.configuration.exceptions.AppointmentStatusException;
import com.example.serveonspot.configuration.exceptions.ErrorDto;
import com.example.serveonspot.configuration.exceptions.SpecialistException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class ExceptionAdvice extends ResponseEntityExceptionHandler {

    @ExceptionHandler(AppointmentException.class)
    public ResponseEntity<ErrorDto> handleAppointmentException(AppointmentException ex) {
        ErrorDto errorDto = ErrorDto.builder().message(ex.getMessage()).build();
        return new ResponseEntity<>(errorDto, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AppointmentStatusException.class)
    public ResponseEntity<ErrorDto> handleAppointmentStatus(AppointmentStatusException ex) {
        ErrorDto errorDto = ErrorDto.builder().message(ex.getMessage()).build();
        return new ResponseEntity<>(errorDto, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(SpecialistException.class)
    public ResponseEntity<ErrorDto> handleSpecialistException(SpecialistException ex) {
        ErrorDto errorDto = ErrorDto.builder().message(ex.getMessage()).build();
        return new ResponseEntity<>(errorDto, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDto> handleIOException(Exception ex) {
        ErrorDto errorDto = ErrorDto.builder().message(ex.getMessage()).build();
        return new ResponseEntity<>(errorDto, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}


