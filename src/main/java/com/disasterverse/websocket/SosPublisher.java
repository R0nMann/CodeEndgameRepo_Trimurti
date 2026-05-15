package com.disasterverse.websocket;

import com.disasterverse.dto.response.SosResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SosPublisher {

    private final SimpMessagingTemplate messagingTemplate;

    public void publishSos(SosResponse sosResponse) {
        messagingTemplate.convertAndSend("/topic/sos", sosResponse);
    }
}