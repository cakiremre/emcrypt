package com.beam.emcryptcore.model.comm.mail;

public enum Status {
    SENT("SENT"),
    PENDING("PENDING"),
    ERROR("ERROR"),
    ABORT("ABORT");

    private final String text;

    Status(final String text) {
        this.text = text;
    }

    @Override
    public String toString() {
        return text;
    }
}
