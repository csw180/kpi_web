########################## common_nx.mk #######################################
# Server Pro*C makefile
#include $(ORACLE_HOME)/precomp/lib/env_precomp.mk

ECHO     = echo
ECHOLINE = "================================================================"

### 소스,오브젝트,템프 디렉토리를 설정한다.
LOAN_HOME_DIR    = /PLOAN/BLS/PLOAN
LOAN_SRC_DIR      = ./
LOAN_OBJ_DIR      = ./
LOAN_TMP_DIR      = ./
LOAN_INC_DIR      = ./
LOAN_LIB_DIR      = ./
LOAN_RUN_DIR      = ./

TMAX_BKAPP_DIR    = $(TMAXDIR)/bkappbin
### 실행 프로세서(서버)를 설정한다
TARGET      = $(SOURCE)

### 해당 오브젝트를 설정한다
XOBJS       = $(LOAN_OBJ_DIR)/$(SOURCE).o \
		  	  $(LOAN_OBJ_DIR)/$(SERVER)_svctab.o \
		  	  $(LOAN_OBJ_DIR)/$(SDLOBJ)
		  	  
TRGOBJ      = $(LOAN_OBJ_DIR)/plnpp0200.o

LOGOBJ_NX   = $(COMLIB)/f_StartEndNx.o

### 컴파일러 정보를 설정한다
PROC      = proc
CC        = cc
 
LIBHOME   = $(ORACLE_HOME)/lib32/
PROLDLIBS = -L$(ORACLE_HOME)/lib32/ -lclntsh `cat $(ORACLE_HOME)/lib32/sysliblist` -lld -lm -L/usr/lib -ldns -lrt -lpthread -lc

ORALIBDIR 	= $(LIBHOME)
ORALIB 		= $(PROLDLIBS)
SDLFILE 	= demo

# Using Shared Library
LIBS		= -lsvr -loras
SDLOBJ  	= $(SDLFILE)_sdl.o
SDLC    	= $(SDLFILE)_sdl.c
OBJS    	= $(XOBJS) 
SVCTOBJ 	= $(LOAN_OBJ_DIR)/$(SERVER)_svctab.o

APPDIR  	= $(TMAXDIR)/appbin
SVCTDIR 	= $(TMAXDIR)/svct
TMAX_SDL_DIR  = $(TMAXDIR)/sample/sdl
LIBDIR 		= $(TMAXDIR)/lib
NSDLOBJ		= $(TMAXDIR)/lib/sdl.o
 
### 컴파일 옵션 설정.
PC_FLAGS	= include=$(TMAXDIR) include=$(LOAN_INC_DIR) include=$(COM_INC_DIR)

CC_FLAGS  	= -DTEST_SYS=0 -q32 -g  -brtl -O -I$(LOAN_LIB_DIR) -I$(LOAN_RUN_DIR)
LD_FLAGS  	= -lm
ORA_FLAGS 	= -L$(ORACLE_HOME)/lib32/ -lclntsh `cat $(ORACLE_HOME)/lib32/sysliblist` -lld -lm -L/usr/lib -ldns -lrt -lpthread -lc

# Application compile

all: $(SERVER) $(XOBJS)

$(SERVER): $(OBJS)
	@$(ECHO)   "$(ECHOLINE)"
	@$(ECHO)   "  $(TARGET) : $(SOURCE) Main Process "
	@$(ECHO)   "$(ECHOLINE)"

	$(CC) $(CC_FLAGS)  -o $(SERVER) $(LD_FLAGS) -L$(ORALIBDIR) $(ORALIB) $(OBJS) $(TRGOBJ) -L$(LOGOBJ_NX) -L$(LIBDIR) $(LIBS) 
	mv -f $(SERVER) $(TMAX_BKAPP_DIR)
	rm -f $(LOAN_SRC_DIR)/*.cod
	rm -f $(LOAN_SRC_DIR)/*.cud
	rm -f $(LOAN_SRC_DIR)/*.dcl
	rm -f $(LOAN_SRC_DIR)/*.lis
	rm -f $(LOAN_SRC_DIR)/$(TARGET).c
	rm -f $(SVCTOBJ)
	@$(ECHO)   "$(ECHOLINE)"

$(LOAN_OBJ_DIR)/$(SOURCE).o: $(LOAN_SRC_DIR)/$(SOURCE).pc
	$(PROC) $(PC_FLAGS) iname=$(LOAN_SRC_DIR)/$(SOURCE).pc oname=$(LOAN_TMP_DIR)/$(SOURCE).c include=$(TMAXDIR)
	$(CC) $(CC_FLAGS) -c $(LOAN_TMP_DIR)/$(SOURCE).c
	mv $(SOURCE).o $(LOAN_OBJ_DIR)

$(LOAN_OBJ_DIR)/$(SERVER)_svctab.o : $(SVCTDIR)/$(SERVER)_svctab.c
	touch $(SVCTDIR)/$(SERVER)_svctab.c
	$(CC) $(CC_FLAGS) -Aa -c $(SVCTDIR)/$(SERVER)_svctab.c
	mv $(SERVER)_svctab.o $(LOAN_OBJ_DIR)

$(LOAN_OBJ_DIR)/$(SDLOBJ)          : $(TMAX_SDL_DIR)/$(SDLC)
	$(TMAXDIR)/bin/sdlc32 -i $(TMAX_SDL_DIR)/$(SDLFILE).s
	$(CC) $(CC_FLAGS) -c $(TMAX_SDL_DIR)/$(SDLC)
	mv $(SDLOBJ) $(LOAN_OBJ_DIR)

### 관련 오브젝트를 삭제한다
clean:
	rm -f $(XOBJS)

######################################## end #################################
