package com.example.serveonspot.bin;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Event {

    private String userId;
    private Object content;

}

