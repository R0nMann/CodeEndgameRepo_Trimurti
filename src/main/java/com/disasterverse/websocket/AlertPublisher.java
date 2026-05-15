package com.disasterverse.websocket;

import com.disasterverse.dto.response.AlertResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AlertPublisher {

    private final SimpMessagingTemplate messagingTemplate;

    public void publishAlert(AlertResponse alertResponse) {
        messagingTemplate.convertAndSend("/topic/alerts", alertResponse);
    }
}