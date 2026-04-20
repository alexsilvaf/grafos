CC = gcc
CFLAGS = -Wall -fPIC -O2

UNAME_S := $(shell uname -s 2>/dev/null)

ifeq ($(OS),Windows_NT)
    TARGET = grafo.dll
    LDFLAGS = -shared
else ifeq ($(UNAME_S),Darwin)
    TARGET = libgrafo.dylib
    LDFLAGS = -dynamiclib
else
    TARGET = libgrafo.so
    LDFLAGS = -shared
endif

all: $(TARGET)

$(TARGET): grafo.o
	$(CC) $(LDFLAGS) -o $(TARGET) grafo.o

grafo.o: grafo.c grafo.h
	$(CC) $(CFLAGS) -c grafo.c -o grafo.o

clean:
	rm -f *.o *.so *.dll *.dylib

.PHONY: all clean
