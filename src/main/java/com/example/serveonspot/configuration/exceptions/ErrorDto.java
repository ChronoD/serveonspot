package com.example.serveonspot.configuration.exceptions;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ErrorDto {

    private String message;

}

