FROM debian:bullseye-slim
RUN apt-get update && apt-get -y install openjdk-11-jdk-headless \
  wget \
  zip \
  git \
  ruby \
  ruby-dev \
  ubuntu-dev-tools
# Packaged Saxon is still v9.x, so we need to get it the hard way
RUN wget -O SaxonHE10.zip https://downloads.sourceforge.net/project/saxon/Saxon-HE/10/Java/SaxonHE10-7J.zip; \ 
  unzip -d SaxonHE10 SaxonHE10.zip; \
  mv SaxonHE10/saxon-he-10.7.jar /usr/share/java/; \
  ln -s /usr/share/java/saxon-he-10.7.jar /usr/share/java/saxon-he-10.jar; \
  echo "#! /bin/bash" > /usr/local/bin/saxon \
    && echo "java -jar /usr/share/java/saxon-he-10.jar \$*" >> /usr/local/bin/saxon \
    && chmod 755 /usr/local/bin/saxon; \
  mkdir /opt/actions; \
  gem install bundler
COPY process.sh /opt/actions/process.sh
ENTRYPOINT ["/opt/actions/process.sh"]
