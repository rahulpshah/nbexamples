FROM jupyter/minimal-notebook

COPY . /srv/

RUN pip install /srv

RUN jupyter serverextension enable --py nbexamples --sys-prefix && \
  jupyter nbextension install --py nbexamples --sys-prefix && \
  jupyter nbextension enable --py nbexamples --sys-prefix

RUN echo 'c.Examples.reviewed_example_dir = "/opt/jupyter/examples/reviewed"' >> /home/jovyan/.jupyter/jupyter_notebook_config.py
RUN echo 'c.Examples.unreviewed_example_dir = "/opt/jupyter/examples/unreviewed"' >> /home/jovyan/.jupyter/jupyter_notebook_config.py
