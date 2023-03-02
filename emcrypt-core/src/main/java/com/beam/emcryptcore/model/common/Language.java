package com.beam.emcryptcore.model.common;

public enum Language {
    EN, TR, DE, AR, AZ;

    public static Language fromString(String str) {
        if (str == null) {
            return null;
        }

        switch (str) {
            case "EN":
                return EN;
            case "TR":
                return TR;
            case "DE":
                return DE;
            case "AR":
                return AR;
            case "AZ":
                return AZ;
            default:
                return null;
        }
    }
}