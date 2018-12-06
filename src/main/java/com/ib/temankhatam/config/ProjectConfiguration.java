package com.ib.temankhatam.config;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Configuration
public class ProjectConfiguration {
	private static final Logger log = LoggerFactory.getLogger(ProjectConfiguration.class);

	@EventListener(ApplicationReadyEvent.class)
	public void doSomethingAfterStartup() {
		log.info("hello world, I have just started up");
	}
}
