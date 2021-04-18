package com.example.serveonspot.utils;

import com.example.serveonspot.dtos.SpecialistType;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;

public class SpecTypeSerializer extends StdSerializer<SpecialistType> {

    public SpecTypeSerializer() {
        this(null);
    }

    public SpecTypeSerializer(Class<SpecialistType> t) {
        super(t);
    }

    @Override
    public void serialize(
            SpecialistType specialistType, JsonGenerator jsonGenerator, SerializerProvider serializer) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeStringField("car_brand", specialistType.toString());
        jsonGenerator.writeEndObject();
    }
}

