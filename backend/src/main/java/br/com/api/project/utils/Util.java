package br.com.api.project.utils;

import java.beans.FeatureDescriptor;
import java.util.stream.Stream;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;

public class Util {

	public static void copyNonNullProperties(Object source, Object target) {
        BeanUtils.copyProperties(source, target, getNullOrEmptyPropertyNames(source));
    }

    public static String[] getNullOrEmptyPropertyNames(Object source) {
        final BeanWrapper wrappedSource = new BeanWrapperImpl(source);
        return Stream.of(wrappedSource.getPropertyDescriptors())
            .map(FeatureDescriptor::getName)
            .filter(propertyName -> {
                Object value = wrappedSource.getPropertyValue(propertyName);
                return value == null || (value instanceof String && ((String) value).isEmpty());
            })
            .toArray(String[]::new);
    }
}
