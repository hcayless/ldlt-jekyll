FROM debian:buster-slim
RUN apt-get update && apt-get -y install openjdk-11-jdk-headless \
  wget \
  zip \
  git 
# Packaged Saxon is still v9.x, so we need to get it the hard way
RUN wget -O SaxonHE10.zip https://downloads.sourceforge.net/project/saxon/Saxon-HE/10/Java/SaxonHE10-7J.zip
RUN unzip -d SaxonHE10 SaxonHE10.zip
RUN mv SaxonHE10/saxon-he-10.7.jar /usr/share/java/
RUN ln -s /usr/share/java/saxon-he-10.7.jar /usr/share/java/saxon-he-10.jar
RUN echo "#! /bin/bash" > /usr/local/bin/saxon \
    && echo "java -jar /usr/share/java/saxon-he-10.jar \$*" >> /usr/local/bin/saxon \
    && chmod 755 /usr/local/bin/saxon
RUN mkdir /opt/actions
COPY process.sh /opt/actions/process.sh
ENTRYPOINT ["/opt/actions/process.sh"]
