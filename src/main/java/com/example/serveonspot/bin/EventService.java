package com.example.serveonspot.bin;

import org.springframework.stereotype.Service;
import reactor.core.publisher.DirectProcessor;
import reactor.core.publisher.FluxProcessor;
import reactor.core.publisher.FluxSink;

@Service
public class EventService {

    private final FluxProcessor<Event, Event> processor;
    private final FluxSink<Event> sink;


    public EventService() {
        DirectProcessor<Event> directProcessor = DirectProcessor.create();
        this.processor = directProcessor.serialize();
        this.sink = processor.sink();
    }

    public void publishEvent(Event event) {
        sink.next(event);
    }

    public FluxProcessor<Event, Event> getProcessor() {
        return processor;
    }


}
